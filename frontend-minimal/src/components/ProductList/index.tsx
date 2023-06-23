'use client';

import { useProducts } from '@/hooks/useProducts';
import { useEffect } from 'react';

export const ProductList = (): JSX.Element => {
  const { products, retrieveProducts } = useProducts();

  useEffect(() => {
    retrieveProducts();
  }, []);

  return (
    <div>
      {products?.map((product) => (
        <div key={product?.id}>{product.name}</div>
      ))}
    </div>
  );
};
