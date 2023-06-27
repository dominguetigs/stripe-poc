import { AxiosResponse } from 'axios';

import Service from './request';

export class ProductService {
  private endpoint = 'stripe/products';

  list = async (): Promise<AxiosResponse<any, any>> => {
    const url = this.endpoint;
    return Service.get(url) as Promise<AxiosResponse<any, any>>;
  };

  retrive = async (id: string): Promise<AxiosResponse<any, any>> => {
    const url = `${this.endpoint}/${id}`;
    return Service.get(url) as Promise<AxiosResponse<any, any>>;
  };
}
