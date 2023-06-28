/* eslint-disable import/no-anonymous-default-export */
import axios, { AxiosError, AxiosInstance, AxiosResponse, RawAxiosRequestHeaders } from 'axios';

// import { setSession } from '@/auth/utils';

type Methods = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

const BASE_URL = process.env.NEXT_PUBLIC_API as string;

export class Service {
  service: AxiosInstance;
  private baseUrl: string;

  constructor(baseUrl = BASE_URL) {
    this.baseUrl = baseUrl ?? '';

    const service = axios.create();
    service.interceptors.response.use(this.handleSuccess as any, this.handleError);
    service.defaults.headers['Content-Type'] = 'application/json';
    this.service = service;
  }

  handleSuccess = ({ status, data }: any): { status: any; data: any } => {
    return { status, data };
  };

  handleError = (error: AxiosError): void => {
    // const data = error?.response?.data as any;

    if (error?.response?.status === 401) {
      // window.location.replace('/login');
      // setSession(null, null);
      return;
    }

    throw error;
  };

  request = async (
    method: Methods,
    endpoint: string,
    payload = {},
    headers: RawAxiosRequestHeaders = {}
  ): Promise<any> => {
    const path = `${this.baseUrl}/${endpoint}`;

    console.log(path);

    if (method === 'GET') {
      return this.service.get(path);
    }

    return this.service.request({
      method,
      url: path,
      responseType: 'json',
      data: payload,
      headers,
    });
  };

  async get(endpoint: string, headers?: RawAxiosRequestHeaders): Promise<AxiosResponse<any, any>> {
    return this.request('GET', endpoint, {}, headers);
  }

  async patch(endpoint: string, payload: any, headers?: RawAxiosRequestHeaders): Promise<AxiosResponse<any, any>> {
    return this.request('PATCH', endpoint, payload, headers);
  }

  async put(endpoint: string, payload: any, headers?: RawAxiosRequestHeaders): Promise<AxiosResponse<any, any>> {
    return this.request('PUT', endpoint, payload, headers);
  }

  async post(endpoint: string, payload: any, headers?: RawAxiosRequestHeaders): Promise<AxiosResponse<any, any>> {
    return this.request('POST', endpoint, payload, headers);
  }

  async delete(endpoint: string, payload: any, headers?: RawAxiosRequestHeaders): Promise<AxiosResponse<any, any>> {
    return this.request('DELETE', endpoint, payload, headers);
  }
}

export default new Service();
