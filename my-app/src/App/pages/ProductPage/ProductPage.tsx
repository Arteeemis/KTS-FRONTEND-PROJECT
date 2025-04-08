import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import Header from 'components/Header';
import BackLink from './components/BackLink';
import ProductImage from './components/ProductImage';
import ProductInfo from './components/ProductInfo';
import ProductActions from './components/ProductActions';
import RelatedItems from './components/RelatedItems';
import Text from 'components/Text';
import './ProductPage.scss';
import { useProductContext } from 'contexts/ProductContext';
import { mockProducts } from 'entities/product/mocks/data';

const ProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { product, loading, error, fetchProduct } = useProductContext();

  useEffect(() => {
    if (id && (!product || product.id !== id)) {
      fetchProduct(id);
    }
  }, [id, product, fetchProduct]);

  if (loading) {
    return (
      <Text className="product-page__loading" view="title">
        Loading product details...
      </Text>
    );
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!product) {
    return <div>Product not found.</div>;
  }

  return (
    <div className="product-page">
      <Header />
      <div className="product-page__content">
        <BackLink />
        <div className="product-details">
          <ProductImage product={product} />
          <div className="product-details__info">
            <ProductInfo product={product} />
            <ProductActions product={product} />
          </div>
        </div>
        <RelatedItems products={mockProducts} />
      </div>
    </div>
  );
};

export default ProductPage;
