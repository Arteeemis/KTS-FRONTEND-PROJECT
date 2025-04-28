import React from 'react';
import Input from 'components/Input';
import Button from 'components/Button';
import Text from 'components/Text';
import MultiDropdown, { Option } from 'components/MultiDropdown';
import { CATEGORY_OPTIONS } from '../../constants';
import { catalogStore } from 'store/CatalogStore/CatalogStore';

interface SearchSectionProps {
  searchValue: string;
  setSearchValue: (value: string) => void;
  selectedOptions: Option[];
  setSelectedOptions: (options: Option[]) => void;
  productsCount: number;
}

const SearchSection: React.FC<SearchSectionProps> = ({
  searchValue,
  setSearchValue,
  selectedOptions,
  setSelectedOptions,
  productsCount,
}) => {
  const handleSearch = () => {
    const selectedCategoryKeys = selectedOptions.map((option) => option.value);
    catalogStore.searchProducts(searchValue, selectedCategoryKeys);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="search">
      <div className="search__bar">
        <Input value={searchValue} onChange={setSearchValue} onKeyDown={handleKeyDown} placeholder="Search product" />
        <Button className="search__button" onClick={handleSearch}>
          Find now
        </Button>
      </div>
      <MultiDropdown
        className="search__filter"
        options={CATEGORY_OPTIONS}
        value={selectedOptions}
        onChange={setSelectedOptions}
        getTitle={(options) => options.map((opt) => opt.value).join(', ')}
      />
      <Text className="search__items-count">
        Total products: <span className="search__items-count-highlight">{productsCount}</span>
      </Text>
    </div>
  );
};

export default SearchSection;
