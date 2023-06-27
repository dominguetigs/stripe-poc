import { AuthService } from './auth';
import { ProductService } from './product';

import { StripeService } from './stripe';

export class Api {
  auth = new AuthService();
  product = new ProductService();

  stripe = new StripeService();
}
