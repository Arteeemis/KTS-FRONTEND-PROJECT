import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useParams } from 'react-router';
import Header from 'components/Header';
import BackLink from './components/BackLink';
import ProductImage from './components/ProductImage';
import ProductInfo from './components/ProductInfo';
import ProductActions from './components/ProductActions';
import RelatedItems from './components/RelatedItems';
import Text from 'components/Text';
import { productStore } from '../../../store/ProductStore/ProductStore';
import { mockProducts } from 'entities/product/mocks/data';
import './ProductPage.scss';

const ProductPage: React.FC = observer(() => {
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (id && (!productStore.currentProduct || productStore.currentProduct.id !== id)) {
      productStore.fetchProduct(id);
    }
  }, [id]);

  if (productStore.loading) {
    return (
      <Text className="product-page__loading" view="title">
        Loading product details...
      </Text>
    );
  }

  if (productStore.error) {
    return <div>Error: {productStore.error.message}</div>;
  }

  if (!productStore.currentProduct) {
    return <div>Product not found.</div>;
  }

  return (
    <div className="product-page">
      <Header />
      <div className="product-page__content">
        <BackLink />
        <div className="product-details">
          <ProductImage product={productStore.currentProduct} />
          <div className="product-details__info">
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
