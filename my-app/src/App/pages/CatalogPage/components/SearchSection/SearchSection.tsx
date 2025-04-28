import React, { useCallback } from 'react';
import Input from 'components/Input';
import Button from 'components/Button';
import Text from 'components/Text';
import MultiDropdown, { Option } from 'components/MultiDropdown';
import { CATEGORY_OPTIONS } from '../../constants';
import CatalogStore from 'store/CatalogStore/CatalogStore';
import styles from '../../CatalogPage.module.scss';

interface SearchSectionProps {
  catalogStore: CatalogStore;
  productsCount: number;
}

const SearchSection: React.FC<SearchSectionProps> = ({ catalogStore, productsCount }) => {
  const handleSearch = useCallback(() => {
    const categoryKeys = catalogStore.selectedOptions.map((option) => option.value);
    catalogStore.searchProducts(catalogStore.searchValue, categoryKeys);
  }, [catalogStore]);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter') {
        handleSearch();
      }
    },
    [handleSearch],
  );

  const handleDropdownChange = useCallback(
    (newOptions: Option[]) => {
      if (newOptions.some((option) => option.value === 'All')) {
        catalogStore.setSelectedOptions([]);
      } else {
        catalogStore.setSelectedOptions(newOptions);
      }
      handleSearch();
    },
    [catalogStore, handleSearch],
  );

  return (
    <div className={styles.search}>
      <div className={styles.searchBar}>
        <Input
          value={catalogStore.searchValue}
          onChange={(value) => catalogStore.setSearchValue(value)}
          onKeyDown={handleKeyDown}
          placeholder="Search product"
        />
        <Button className={styles.searchButton} onClick={handleSearch}>
          Find now
        </Button>
      </div>
      <MultiDropdown
        className={styles.searchFilter}
        options={CATEGORY_OPTIONS}
        value={catalogStore.selectedOptions}
        onChange={handleDropdownChange}
        getTitle={(options) => options.map((opt) => opt.value).join(', ')}
      />
      <Text className={styles.searchItemsCount}>
        Total products: <span className={styles.searchItemsCountHighlight}>{productsCount}</span>
      </Text>
    </div>
  );
};

export default SearchSection;
