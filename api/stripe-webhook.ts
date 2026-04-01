import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createHmac, timingSafeEqual } from 'crypto';

const KEYGEN_ACCOUNT_ID = '60fb65e1-9a4a-4d82-b75f-74e46fa356ac';
const KEYGEN_POLICY_ID = '3ad21f2d-c922-47d4-b042-328a9ebcc5d0';

export const config = {
  api: { bodyParser: false },
};

function verifyStripeSignature(payload: string, sig: string, secret: string): boolean {
  const parts = sig.split(',').reduce((acc, part) => {
    const [key, value] = part.split('=');
    acc[key] = value;
    return acc;
  }, {} as Record<string, string>);

  const timestamp = parts['t'];
  const signature = parts['v1'];

  if (!timestamp || !signature) return false;

  const signedPayload = `${timestamp}.${payload}`;
  const expected = createHmac('sha256', secret).update(signedPayload).digest('hex');

  try {
    return timingSafeEqual(Buffer.from(expected), Buffer.from(signature));
  } catch {
    return false;
  }
}

async function getRawBody(req: VercelRequest): Promise<string> {
  const chunks: Buffer[] = [];
  for await (const chunk of req) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
  }
  return Buffer.concat(chunks).toString('utf8');
}

async function createKeygenLicense(email: string, stripePaymentId: string): Promise<string | null> {
  const res = await fetch(`https://api.keygen.sh/v1/accounts/${KEYGEN_ACCOUNT_ID}/licenses`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/vnd.api+json',
      Accept: 'application/vnd.api+json',
      Authorization: `Bearer ${process.env.KEYGEN_API_TOKEN}`,
    },
    body: JSON.stringify({
      data: {
        type: 'licenses',
        attributes: {
          metadata: { email, stripePaymentId },
        },
        relationships: {
          policy: {
            data: { type: 'policies', id: KEYGEN_POLICY_ID },
          },
        },
      },
    }),
  });

  const json = await res.json();
  if (res.ok && json.data?.attributes?.key) {
    return json.data.attributes.key;
  }
  console.error('Keygen error:', JSON.stringify(json));
  return null;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const rawBody = await getRawBody(req);
  const sig = req.headers['stripe-signature'] as string;

  if (!sig || !verifyStripeSignature(rawBody, sig, process.env.STRIPE_WEBHOOK_SECRET!)) {
    return res.status(400).json({ error: 'Invalid signature' });
  }

  const event = JSON.parse(rawBody);

  if (event.type === 'payment_intent.succeeded') {
    const paymentIntent = event.data.object;
    const email = paymentIntent.metadata?.email;
    const product = paymentIntent.metadata?.product;

    if (product === 'moovoa-pro' && email) {
      const licenseKey = await createKeygenLicense(email, paymentIntent.id);

      if (licenseKey) {
        await fetch(`https://api.stripe.com/v1/payment_intents/${paymentIntent.id}`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${process.env.STRIPE_SECRET_KEY}`,
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: new URLSearchParams({ 'metadata[license_key]': licenseKey }).toString(),
        });
      }
    }
  }

  return res.status(200).json({ received: true });
}
