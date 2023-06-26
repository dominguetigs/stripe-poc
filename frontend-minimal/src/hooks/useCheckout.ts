import { apiNext } from '@/services/api-next';
import { getStripeJs } from '@/services/stripe-js';

interface UseCheckoutReturn {
  createSession: (priceId: string) => Promise<void>;
}

export const useCheckout = (): UseCheckoutReturn => {
  async function createSession(priceId: string): Promise<void> {
    try {
      const response = await apiNext.post('/stripe/checkout-session', { priceId });
      const { sessionId } = response.data;

      const stripeJs = await getStripeJs();

      await stripeJs?.redirectToCheckout({ sessionId });
    } catch (error) {
      console.error(error);
    }
  }

  return { createSession };
};
