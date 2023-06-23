'use client';

import { useState } from 'react';

import { api } from '@/services/api';

interface UseProductsReturn {
  product: any;
  products: any[];
  retrieveProduct: (productId: string) => Promise<void>;
  retrieveProducts: () => Promise<void>;
}

export const useProducts = (): UseProductsReturn => {
  const [product, setProduct] = useState();

  const [products, setProducts] = useState([]);

  async function retrieveProduct(productId: string): Promise<any> {
    try {
      const response = await api.get(`/stripe/products/${productId}`);
      const responseData = response.data;
      setProduct(responseData);
      return responseData;
    } catch (error) {
      console.error(error);
    }
  }

  async function retrieveProducts(): Promise<any> {
    try {
      const response = await api.get('/stripe/products');
      const responseData = response.data?.data;
      setProducts(responseData);
      return responseData;
    } catch (error) {
      console.error(error);
    }
  }

  return { product, products, retrieveProduct, retrieveProducts };
};
