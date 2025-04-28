import React, { useEffect } from 'react';
import { useLocalStore } from '../../../utils/useLocalStore';
import { observer } from 'mobx-react-lite';
import { reaction } from 'mobx';
import Text from 'components/Text';
import Header from 'components/Header';
import IntroSection from './components/IntroSection';
import SearchSection from './components/SearchSection';
import ProductGrid from './components/ProductGrid';
import Pagination from './components/Pagination';
// import { Option } from 'components/MultiDropdown';
import CatalogStore from 'store/CatalogStore/CatalogStore';
import QueryParamsStore from 'store/RootStore/QueryParamsStore/QueryParamsStore';
import styles from './CatalogPage.module.scss';
import SkeletonCard from './components/SkeletonLoader';
import { CATEGORY_OPTIONS } from './constants';

const CatalogPage: React.FC = observer(() => {
  const catalogStore = useLocalStore(() => new CatalogStore());
  const queryParamsStore = useLocalStore(() => new QueryParamsStore());

  useEffect(() => {
    queryParamsStore.setSearch(window.location.search);

    const q = queryParamsStore.getParam('q') as string;
    const page = queryParamsStore.getParam('page') as string;
    const categoryKeys = queryParamsStore.getParam('category') as string[];

    if (q) catalogStore.setSearchValue(q);
    if (page) catalogStore.setCurrentPage(Number(page));
    if (categoryKeys) {
      const categoryOptions = CATEGORY_OPTIONS.filter((option) => categoryKeys.includes(option.key));
      catalogStore.setSelectedOptions(categoryOptions);
    }
  }, [queryParamsStore, catalogStore]);

  // Reaction to sync CatalogStore with QueryParamsStore
  useEffect(() => {
    const disposeReaction = reaction(
      () => ({
        searchValue: catalogStore.searchValue,
        currentPage: catalogStore.currentPage,
        selectedOptions: catalogStore.selectedOptions.map((option) => option.key),
      }),
      ({ searchValue, currentPage, selectedOptions }) => {
        queryParamsStore.setQueryParam('q', searchValue);
        queryParamsStore.setQueryParam('page', currentPage);
        queryParamsStore.setQueryParam('category', selectedOptions.join(',') || undefined);
      },
    );

    return () => disposeReaction();
  }, [catalogStore, queryParamsStore]);

  useEffect(() => {
    catalogStore.fetchAllProducts();
  }, [catalogStore]);

  useEffect(() => {
    const timer = setTimeout(() => catalogStore.setShowSkeleton(false), 1000);
    return () => clearTimeout(timer);
  }, [catalogStore.loading, catalogStore.selectedOptions]);

  useEffect(() => {
    catalogStore.setShowSkeleton(true);
  }, [catalogStore.selectedOptions, catalogStore.products.length]);

  useEffect(() => {
    const categoryKeys = catalogStore.selectedOptions.map((option) => option.value);
    catalogStore.searchProducts(catalogStore.searchValue, categoryKeys);
  }, [catalogStore.selectedOptions, catalogStore.searchValue, catalogStore]);

  if (catalogStore.error) {
    return (
      <Text className={styles.error} view="title">
        Error: {catalogStore.error.message}
      </Text>
    );
  }

  return (
    <div className={styles.page}>
      <Header />
      <div className={styles.content}>
        <IntroSection />

        <SearchSection catalogStore={catalogStore} productsCount={catalogStore.products.length} />

        {catalogStore.showSkeleton ? (
          <div className={styles.productGrid}>
            {Array.from({ length: 6 }).map((_, index) => (
              <SkeletonCard key={index} />
            ))}
          </div>
        ) : (
          <ProductGrid products={catalogStore.currentPosts} />
        )}

        <Pagination
          totalPosts={catalogStore.products.length}
          postsPerPage={catalogStore.postsPerPage}
          setCurrentPage={catalogStore.setCurrentPage.bind(catalogStore)}
          currentPage={catalogStore.currentPage}
        />
      </div>
    </div>
  );
});

export default CatalogPage;
