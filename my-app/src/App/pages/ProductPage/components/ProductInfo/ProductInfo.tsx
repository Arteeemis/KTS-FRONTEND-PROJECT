import React from 'react';
import Text from 'components/Text';
import { Product } from 'entities/product/types';
import styles from '../../ProductPage.module.scss';

interface ProductInfoProps {
  product: Product;
}

const ProductInfo: React.FC<ProductInfoProps> = ({ product }) => (
  <>
    <Text view="title">{product.title}</Text>
    <Text tag="p" color="secondary" className={styles['product-details__description']}>
      {product.description}
    </Text>
  </>
);

export default ProductInfo;
