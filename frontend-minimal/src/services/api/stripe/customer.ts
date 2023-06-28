import { AxiosResponse } from 'axios';

import Service from '../request';
import { StripeBaseService } from './base';

export class StripeCustomerService extends StripeBaseService {
  private endpoint = this.baseUrl;

  constructor() {
    super();
  }

  create = async (): Promise<AxiosResponse<any, any>> => {
    const url = `${this.endpoint}/customer`;
    return Service.post(url, {}) as Promise<AxiosResponse<any, any>>;
  };

  retriveByEmail = async (): Promise<AxiosResponse<any, any>> => {
    const url = `${this.endpoint}/customer-by-email`;
    console.log(url, 777);
    return Service.get(url) as Promise<AxiosResponse<any, any>>;
  };
}
