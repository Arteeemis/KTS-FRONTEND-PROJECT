import React, { useState } from 'react';
import { useCatalogContext } from 'contexts/CatalogContext';
import Text from 'components/Text';
import Header from 'components/Header';
import IntroSection from './components/IntroSection';
import SearchSection from './components/SearchSection';
import ProductGrid from './components/ProductGrid';
import Pagination from './components/Pagination';
import { Option } from 'components/MultiDropdown';
import './CatalogPage.scss';

const CatalogPage: React.FC = () => {
  const { products, loading, error } = useCatalogContext();
  const [searchValue, setSearchValue] = useState<string>('');
  const [selectedOptions, setSelectedOptions] = useState<Option[]>([]);

  if (loading) {
    return (
      <Text className="main-page__loading" view="title">
        Loading products...
      </Text>
    );
  }

  if (error) {
    return (
      <Text className="main-page__error" view="title">
        Error: {error.message}
      </Text>
    );
  }

  return (
    <div className="main-page">
      <Header />
      <div className="content">
        <IntroSection />

        <SearchSection
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          selectedOptions={selectedOptions}
          setSelectedOptions={setSelectedOptions}
          productsCount={products.length}
        />

        <ProductGrid products={products} />

        <Pagination />
      </div>
    </div>
  );
};

export default CatalogPage;
