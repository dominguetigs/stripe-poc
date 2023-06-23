import { NextApiRequest, NextApiResponse } from 'next';

import { api } from '@/services/api';
import { stripe } from '@/services/stripe';

const checkoutSession = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { priceId } = req.body;
    const response = await api.get('/stripe/customer-by-email');
    let responseData = response.data;

    if (!responseData?.stripe_customer_id) {
      const response = await api.post('/stripe/customer');
      responseData = response.data;
    }

    const { stripe_customer_id } = responseData;

    const stripeCheckoutSession = await stripe.checkout.sessions.create({
      customer: stripe_customer_id,
      payment_method_types: ['card'],
      billing_address_collection: 'required',
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'payment',
      allow_promotion_codes: true,
      success_url: '/',
    });

    return res.status(200).json({ sessionId: stripeCheckoutSession.id });
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method not allowed');
  }
};

export default checkoutSession;
