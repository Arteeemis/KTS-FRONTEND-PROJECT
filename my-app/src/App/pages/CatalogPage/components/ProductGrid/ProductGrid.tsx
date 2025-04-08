import React from 'react';
import { Link } from 'react-router';
import Card from 'components/Card';
import Button from 'components/Button';
import { routes } from 'config/routes';
import { Product } from 'entities/product/types';

interface ProductGridProps {
  products: Product[];
}

const ProductGrid: React.FC<ProductGridProps> = ({ products }) => (
  <div className="product-grid">
    {products.map((product) => (
      <Card
        key={product.id}
        captionSlot={product.subtitle}
        image={product.image}
        title={
          <Link className="product-grid__link" to={routes.product.create(product.id)}>
            {product.title}
          </Link>
        }
        subtitle={product.description}
        contentSlot={product.price}
        actionSlot={<Button>Add to Cart</Button>}
      />
    ))}
  </div>
);

export default ProductGrid;
