import React, { useState } from 'react';
import { Input, Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

const Search = ({ onSearch }) => {
  const [searchText, setSearchText] = useState('');

  const handleSearch = () => {
    // Invoke the onSearch callback with the search text
    onSearch(searchText);
  };

  const handleInputChange = (e) => {
    setSearchText(e.target.value);
  };

  return (
    <div>
      <Input
        placeholder="User search"
        value={searchText}
        onChange={handleInputChange}
        suffix={
          <Button type="primary" onClick={handleSearch}>
            <SearchOutlined />
          </Button>
        }
      />
    </div>
  );
};

export default Search;