'use client';

import { useEffect } from 'react';

import { useCheckout } from '@/hooks/useCheckout';

import { useProducts } from '@/hooks/useProducts';

import styles from './styles.module.css';

export const ProductList = (): JSX.Element => {
  const { createSession } = useCheckout();

  const { products, retrieveProduct, retrieveProducts } = useProducts();

  async function handlePurchase(productId: string): Promise<void> {
    const product: any = await retrieveProduct(productId);
    createSession(product.default_price);
  }

  useEffect(() => {
    retrieveProducts();
  }, []);

  return (
    <div>
      {products?.map((product) => (
        <div key={product?.id} className={styles.wrapper}>
          <div className={styles.imageWrapper}>
            <div className={styles.imageContainer}>
              <img src={product.images[0]} alt="Product cover" />
            </div>
          </div>
          <span className={styles.name}>{product.name}</span>
          <span className={styles['product-type']}>{product.metadata.product_type}</span>
          <button className={styles.purchaseButton} onClick={() => handlePurchase(product.id)}>
            comprar
          </button>
        </div>
      ))}
    </div>
  );
};
