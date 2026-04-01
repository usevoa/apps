import Stripe from 'stripe';
import type { VercelRequest, VercelResponse } from '@vercel/node';

const KEYGEN_ACCOUNT_ID = '60fb65e1-9a4a-4d82-b75f-74e46fa356ac';
const KEYGEN_POLICY_ID = '3ad21f2d';

export const config = {
  api: { bodyParser: false },
};

async function buffer(req: VercelRequest): Promise<Buffer> {
  const chunks: Buffer[] = [];
  for await (const chunk of req) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
  }
  return Buffer.concat(chunks);
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

  console.error('Keygen license creation failed:', JSON.stringify(json));
  return null;
}

async function updatePaymentIntentMetadata(paymentIntentId: string, metadata: Record<string, string>) {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(metadata)) {
    params.append(`metadata[${key}]`, value);
  }

  await fetch(`https://api.stripe.com/v1/payment_intents/${paymentIntentId}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.STRIPE_SECRET_KEY}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: params.toString(),
  });
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const body = await buffer(req);
  const sig = req.headers['stripe-signature'] as string;

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err: any) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).json({ error: 'Invalid signature' });
  }

  if (event.type === 'payment_intent.succeeded') {
    const paymentIntent = event.data.object as Stripe.PaymentIntent;
    const email = paymentIntent.metadata.email;
    const product = paymentIntent.metadata.product;

    if (product === 'moovoa-pro' && email) {
      const licenseKey = await createKeygenLicense(email, paymentIntent.id);

      if (licenseKey) {
        await updatePaymentIntentMetadata(paymentIntent.id, {
          ...paymentIntent.metadata,
          license_key: licenseKey,
        });

        console.log(`License created for ${email}: ${licenseKey}`);
      }
    }
  }

  return res.status(200).json({ received: true });
}
