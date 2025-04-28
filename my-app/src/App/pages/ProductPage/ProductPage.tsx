import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useParams } from 'react-router';
import Header from 'components/Header';
import BackLink from './components/BackLink';
import ProductImage from './components/ProductImage';
import ProductInfo from './components/ProductInfo';
import ProductActions from './components/ProductActions';
import RelatedItems from './components/RelatedItems';
import NotFoundPage from './components/NotFoundPage';
import Text from 'components/Text';
import { useLocalStore } from '../../../utils/useLocalStore';
import ProductStore from 'store/ProductStore';
import { mockProducts } from 'entities/product/mocks/data';
import styles from './ProductPage.module.scss';
import Loader from 'components/Loader';

const ProductPage: React.FC = observer(() => {
  const { id } = useParams<{ id: string }>();
  const productStore = useLocalStore(() => new ProductStore());

  useEffect(() => {
    if (id && (!productStore.currentProduct || productStore.currentProduct.id !== id)) {
      productStore.fetchProduct(id);
    }
  }, [id, productStore]);

  if (productStore.loading) {
    return (
      <div className={styles['product-page']}>
        <div className={styles['product-page__progress']}>
          <Loader />
          <Text className={styles['product-page__loading']} view="title">
            Loading product details...
          </Text>
        </div>
      </div>
    );
  }

  if (productStore.error) {
    return <NotFoundPage />;
  }

  if (!productStore.currentProduct) {
    return <NotFoundPage />;
  }

  return (
    <div className={styles['product-page']}>
      <Header />
      <div className={styles['product-page__content']}>
        <BackLink />
        <div className={styles['product-details']}>
          <ProductImage product={productStore.currentProduct} />
          <div className={styles['product-details__info']}>
            <ProductInfo product={productStore.currentProduct} />
            <ProductActions product={productStore.currentProduct} />
          </div>
        </div>
        <RelatedItems products={mockProducts} />
      </div>
    </div>
  );
});

export default ProductPage;
