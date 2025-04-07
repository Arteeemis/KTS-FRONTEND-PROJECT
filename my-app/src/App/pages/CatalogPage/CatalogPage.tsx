import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import Text from 'components/Text';
import Header from 'components/Header';
import IntroSection from './components/IntroSection';
import SearchSection from './components/SearchSection';
import ProductGrid from './components/ProductGrid';
import Pagination from './components/Pagination';
import { Option } from 'components/MultiDropdown';
import { catalogStore } from 'store/CatalogStore/CatalogStore';
import './CatalogPage.scss';
import { useSearchParams } from 'react-router';

const CatalogPage: React.FC = observer(() => {
  const [searchValue, setSearchValue] = useState<string>('');
  const [selectedOptions, setSelectedOptions] = useState<Option[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [PostPerPage, SetPostPerPage] = useState(6);
  const lastIndex = currentPage * PostPerPage;
  const firstIndex = lastIndex - PostPerPage;
  const currentPosts = catalogStore.products.slice(firstIndex, lastIndex);

  const [searchParams, setSearchParams] = useSearchParams({ q: '', page: '1' });
  const q = searchParams.get('q');
  const page = searchParams.get('page');

  // Sync state with query parameters on page load
  useEffect(() => {
    if (q) setSearchValue(q);
    if (page) setCurrentPage(Number(page));
  }, [q, page]);

  // Update query parameters when state changes
  useEffect(() => {
    setSearchParams({ q: searchValue, page: currentPage.toString() });
  }, [searchValue, currentPage, setSearchParams]);

  if (catalogStore.loading) {
    return (
      <Text className="main-page__loading" view="title">
        Loading products...
      </Text>
    );
  }

  if (catalogStore.error) {
    return (
      <Text className="main-page__error" view="title">
        Error: {catalogStore.error.message}
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
          productsCount={catalogStore.products.length}
        />

        <ProductGrid products={currentPosts} />

        <Pagination
          totalPosts={catalogStore.products.length}
          postsPerPage={PostPerPage}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
});

export default CatalogPage;
