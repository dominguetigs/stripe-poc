import { AxiosResponse } from 'axios';

import Service from './request';

export class AuthService {
  private endpoint = 'users';

  login = async (data: any): Promise<AxiosResponse<any, any>> => {
    const url = `${this.endpoint}/login`;
    return Service.post(url, data) as Promise<AxiosResponse<any, any>>;
  };
}
