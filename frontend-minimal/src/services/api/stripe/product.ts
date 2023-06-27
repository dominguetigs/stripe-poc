import { AxiosResponse } from 'axios';

import Service from '../request';
import { StripeBaseService } from './base';

export class StripeProductService extends StripeBaseService {
  private endpoint = 'products';

  constructor() {
    super();
    this.endpoint = `${this.baseUrl}/${this.endpoint}`;
  }

  list = async (): Promise<AxiosResponse<any, any>> => {
    const url = `${this.endpoint}/products`;
    return Service.get(url) as Promise<AxiosResponse<any, any>>;
  };

  retrive = async (id: string): Promise<AxiosResponse<any, any>> => {
    const url = `${this.endpoint}/products/${id}`;
    return Service.get(url) as Promise<AxiosResponse<any, any>>;
  };
}
