import React from 'react';
import Text from 'components/Text';
import Button from 'components/Button';
import { Product } from 'entities/product/types';

interface ProductActionsProps {
  product: Product;
}

const ProductActions: React.FC<ProductActionsProps> = ({ product }) => (
  <>
    <Text view="title" className="product-details__price">
      {product.price}
    </Text>
    <div className="product-details__actions">
      <Button>Buy Now</Button>
      <Button className="product-details__add-button">Add to Cart</Button>
    </div>
  </>
);

export default ProductActions;
