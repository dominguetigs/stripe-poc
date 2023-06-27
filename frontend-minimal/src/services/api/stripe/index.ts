import { StripeCustomerService } from './customer';
import { StripeProductService } from './product';

export class StripeService {
  customer = new StripeCustomerService();
  product = new StripeProductService();
}
