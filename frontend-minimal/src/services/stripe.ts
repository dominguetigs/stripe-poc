import Stripe from 'stripe';
import packageInfo from '../../package.json';

const stripeSecretKey = process.env.STRIPE_SECRET_KEY ?? '';

export const stripe = new Stripe(stripeSecretKey, {
  apiVersion: '2022-11-15',
  appInfo: {
    name: 'Stripe POC Frontend Minimal',
    version: packageInfo.version,
  },
});
