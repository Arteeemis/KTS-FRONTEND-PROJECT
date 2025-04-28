import React from 'react';
import { Product } from 'entities/product/types';
import styles from '../../ProductPage.module.scss';

interface ProductImageProps {
  product: Product;
}

const ProductImage: React.FC<ProductImageProps> = ({ product }) => (
  <div className={styles['product-details__image']}>
    <img className={styles['product-details__image-img']} src={product.image} alt={product.title} />
  </div>
);

export default ProductImage;
