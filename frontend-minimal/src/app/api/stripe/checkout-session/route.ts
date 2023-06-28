import { NextResponse } from 'next/server';

// import { Api } from '@/services/api';
import { stripe } from '@/services/stripe';
import { api } from '@/services/api';

export async function POST(request: Request) {
  const { priceId } = await request.json();

  // const api = new Api();

  const response = await api.get('/stripe/customer-by-email');

  let responseData = response?.data;

  if (!responseData?.stripe_customer_id) {
    const response = await api.post('/stripe/customer');
    responseData = response.data;
  }

  const { stripe_customer_id } = responseData;

  try {
    const stripeCheckoutSession = await stripe.checkout.sessions.create({
      customer: stripe_customer_id,
      payment_method_types: ['card', 'boleto'],
      // billing_address_collection: 'required',
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
