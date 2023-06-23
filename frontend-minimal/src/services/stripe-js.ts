import { loadStripe } from '@stripe/stripe-js';

export async function getStripeJs() {
  const stripePublishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? '';
  const stripeJs = await loadStripe(stripePublishableKey);
  return stripeJs;
}
