import { stripe } from '@/services/stripe';
import { NextApiRequest, NextApiResponse } from 'next';
import { Readable } from 'stream';
import Stripe from 'stripe';

async function buffer(readable: Readable) {
  const chuncks = [];

  for await (const chunck of readable) {
    chuncks.push(typeof chunck === 'string' ? Buffer.from(chunck) : chunck);
  }

  return Buffer.concat(chuncks);
}

export const config = {
  api: {
    bodyParser: false,
  },
};

const relevantEvents = new Set(['checkout.session.completed']);
const stripeWebhookSigningSecret = process.env.STRIPE_WEBHOOK_SIGNING_SECRET ?? '';

const webhooks = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const buf = await buffer(req);
    const secret = req.headers['stripe-signature'] as any;

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(buf, secret, stripeWebhookSigningSecret);
    } catch (err) {
      const error = err as any;
      return res.status(400).send(`Webhook error: ${error?.message}`);
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
        return res.json({ error: 'Webkook handler failed.' });
      }
    }

    res.json({ received: true });
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method not allowed');
  }
};

export default webhooks;
