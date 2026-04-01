import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email } = req.body;

  if (!email || typeof email !== 'string') {
    return res.status(400).json({ error: 'Email is required' });
  }

  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    return res.status(500).json({ error: 'Stripe not configured' });
  }

  try {
    const response = await fetch('https://api.stripe.com/v1/payment_intents', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${secretKey}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        amount: '399',
        currency: 'usd',
        receipt_email: email,
        'metadata[product]': 'moovoa-pro',
        'metadata[price_id]': 'price_1THPdx1Im4KIpXGD3KjXHGRm',
        'metadata[email]': email,
        'automatic_payment_methods[enabled]': 'true',
      }).toString(),
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({ error: data.error?.message || 'Stripe error' });
    }

    return res.status(200).json({
      clientSecret: data.client_secret,
    });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
}
