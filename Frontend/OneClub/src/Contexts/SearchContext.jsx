// SearchContext.js
import { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const SearchContext = createContext();

export const SearchProvider = (props) => {
  const [searchText, setSearchText] = useState('');
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const navigate = useNavigate();

  return (
    <SearchContext.Provider value={{ isSearchVisible, setIsSearchVisible, searchText, setSearchText, navigate }}>
      {props.children}
    </SearchContext.Provider>
  );
};