import type { VercelRequest, VercelResponse } from '@vercel/node';

const KEYGEN_ACCOUNT_ID = '60fb65e1-9a4a-4d82-b75f-74e46fa356ac';
const KEYGEN_POLICY_ID = '3ad21f2d-c922-47d4-b042-328a9ebcc5d0';

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

  const { paymentIntentId } = req.body;

  if (!paymentIntentId || typeof paymentIntentId !== 'string') {
    return res.status(400).json({ error: 'paymentIntentId is required' });
  }

  try {
    // 1. Get payment intent from Stripe
    const piRes = await fetch(`https://api.stripe.com/v1/payment_intents/${paymentIntentId}`, {
      headers: { Authorization: `Bearer ${process.env.STRIPE_SECRET_KEY}` },
    });
    const paymentIntent = await piRes.json();

    if (paymentIntent.status !== 'succeeded') {
      return res.status(400).json({ error: 'Payment not completed' });
    }

    // 2. If license already exists in metadata, return it
    if (paymentIntent.metadata?.license_key) {
      return res.status(200).json({ licenseKey: paymentIntent.metadata.license_key });
    }

    // 3. Otherwise, create license now
    const email = paymentIntent.metadata?.email;
    if (!email) {
      return res.status(400).json({ error: 'No email in payment' });
    }

    const licenseKey = await createKeygenLicense(email, paymentIntentId);

    if (!licenseKey) {
      return res.status(500).json({ error: 'Failed to create license' });
    }

    // 4. Save license key back to Stripe metadata
    await fetch(`https://api.stripe.com/v1/payment_intents/${paymentIntentId}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.STRIPE_SECRET_KEY}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({ 'metadata[license_key]': licenseKey }).toString(),
    });

    return res.status(200).json({ licenseKey });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
}
