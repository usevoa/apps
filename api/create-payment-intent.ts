import Stripe from 'stripe';
import type { VercelRequest, VercelResponse } from '@vercel/node';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email } = req.body;

  if (!email || typeof email !== 'string') {
    return res.status(400).json({ error: 'Email is required' });
  }

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 399,
      currency: 'usd',
      receipt_email: email,
      metadata: {
        product: 'moovoa-pro',
        price_id: 'price_1THPdx1Im4KIpXGD3KjXHGRm',
        email,
      },
      automatic_payment_methods: {
        enabled: true,
      },
    });

    return res.status(200).json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
}
