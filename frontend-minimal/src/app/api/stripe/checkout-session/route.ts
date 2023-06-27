import { NextResponse } from 'next/server';

import { Api } from '@/services/api';
import { stripe } from '@/services/stripe';

const api = new Api();

export async function POST(request: Request) {
  const { priceId } = await request.json();

  console.log(priceId, 'price ID');

  const response = await api.stripe.customer.retriveByEmail();

  let responseData = response.data;

  if (!responseData?.stripe_customer_id) {
    const response = await api.stripe.customer.create();
    responseData = response.data;
  }

  const { stripe_customer_id } = responseData;

  console.log(stripe_customer_id, 'STRIPE CUSTOMER ID');

  try {
    const stripeCheckoutSession = await stripe.checkout.sessions.create({
      customer: stripe_customer_id,
      payment_method_types: ['card', 'boleto'],
      billing_address_collection: 'required',
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'payment',
      allow_promotion_codes: true,
      success_url: 'http://localhost:3000/success',
    });
    return NextResponse.json({ sessionId: stripeCheckoutSession.id }, { status: 200 });
  } catch (err) {
    const error = err as any;
    return NextResponse.json({ error: error?.message }, { status: 500 });
  }
}
