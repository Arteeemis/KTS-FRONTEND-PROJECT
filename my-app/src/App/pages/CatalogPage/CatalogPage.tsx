// src/pages/CatalogPage.tsx
import React, { useState } from 'react';
import { Link } from 'react-router';
import Headerr from 'components/Headerr';
import Input from 'components/Input';
import Button from 'components/Button';
import Card from 'components/Card';
import Text from 'components/Text';
import MultiDropdown, { Option } from 'components/MultiDropdown';
import './CatalogPage.scss';
import { useProductContext } from '../../../contexts/ProductContext';
import { Product } from '../../../types/Product';

const CatalogPage: React.FC = () => {
  const { products, loading, error } = useProductContext();
  const [searchValue, setSearchValue] = useState<string>('');

  if (loading) {
    return <div>Loading products...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  return (
    <div className="main-page">
      <Headerr />
      <div className="content">
        <Text children="Products" view="title" className="title" />
        <Text
          children="We display products based on the latest products we have, if you want to see our old products please enter the name of the item"
          view="p-20"
          color="secondary"
          className="description"
        />

        <div className="search-bar">
          <Input value={searchValue} onChange={setSearchValue} placeholder="Search product" />
          <Button className="butex">Find now</Button>
        </div>

        <MultiDropdown
          className="dd"
          options={[
            { key: '1', value: 'Мебель' },
            { key: '2', value: 'Одежда' },
            { key: '3', value: 'Аксессуары' },
          ]}
          value={[{ key: '1', value: 'Мебель' }]}
          onChange={(value: Option[]) => console.log('Выбрано:', value)}
          getTitle={() => 'Filter'}
        />

        <div className="product-count">
          Total products: <span style={{ color: '#518581' }}>{products.length}</span>
        </div>

        <div className="product-grid">
          {products.map((product: Product) => (
            <Card
              captionSlot={product.subtitle}
              image={product.image}
              title={
                <Link
                  style={{ textDecoration: 'none', color: 'inherit' }}
                  to={`/product/${product.id}`}
                  key={product.id}
                >
                  {product.title}
                </Link>
              }
              subtitle={product.description}
              contentSlot={<>{product.price}</>}
              actionSlot={<Button>Add to Cart</Button>}
            />
          ))}
        </div>

        <div className="pagination">
          <span>&lt;</span>
          <span className="active">1</span>
          <span>2</span>
          <span>3</span>
          <span>...</span>
          <span>10</span>
          <span>&gt;</span>
        </div>
      </div>
    </div>
  );
};

export default CatalogPage;
