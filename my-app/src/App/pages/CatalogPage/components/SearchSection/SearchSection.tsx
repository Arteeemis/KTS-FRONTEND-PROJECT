import React from 'react';
import Input from 'components/Input';
import Button from 'components/Button';
import Text from 'components/Text';
import MultiDropdown, { Option } from 'components/MultiDropdown';
import { CATEGORY_OPTIONS } from '../../constants';

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
}) => (
  <div className="search">
    <div className="search__bar">
      <Input value={searchValue} onChange={setSearchValue} placeholder="Search product" />
      <Button className="search__button">Find now</Button>
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

export default SearchSection;
