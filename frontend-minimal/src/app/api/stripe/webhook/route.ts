import Stripe from 'stripe';

import { stripe } from '@/services/stripe';
import { NextResponse } from 'next/server';

const relevantEvents = new Set(['checkout.session.completed']);
const stripeWebhookSigningSecret = process.env.STRIPE_WEBHOOK_SIGNING_SECRET ?? '';

export async function POST(request: Request) {
  const buffer = await request.arrayBuffer();
  const payload = Buffer.from(buffer).toString();
  const secret = request.headers.get('stripe-signature') as any;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(payload, secret, stripeWebhookSigningSecret);
  } catch (err) {
    const error = err as any;
    return NextResponse.json({ message: `Webhook error: ${error?.message}` }, { status: 400 });
  }

  const { type } = event;

  if (relevantEvents.has(type)) {
    try {
      switch (type) {
        case 'customer.subscription.updated':
        case 'customer.subscription.deleted':
          const subscription = event.data.object as Stripe.Subscription;

        // await saveSubscription(subscription.id, subscription.customer.toString());
        case 'checkout.session.completed':
          const checkoutSession = event.data.object as Stripe.Checkout.Session;

          /* await saveSubscription(
            checkoutSession.subscription.toString(),
            checkoutSession.customer.toString(),
            true
          ); */
          break;
        default:
          throw new Error('Unhandled event.');
      }
    } catch (error) {
      return NextResponse.json({ error: 'Webkook handler failed.' });
    }
  }

  NextResponse.json({ received: true });
}
