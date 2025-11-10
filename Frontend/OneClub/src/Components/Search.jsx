import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import SearchImage from '../assets/search.png';
import CrossImage from '../assets/cross.png';
import { SearchContext } from '../Contexts/SearchContext';

const Search = () => {
  const { isSearchVisible, setIsSearchVisible, searchText, setSearchText } = useContext(SearchContext);
  const [visible, setVisible] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === '/Collections' || location.pathname === '/') {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [location]);

  const handleSearch = () => {
    if (location.pathname !== '/Collections') {
      navigate('/Collections');
    }
    // Search logic can be triggered via context if needed
  };

  return isSearchVisible && visible ? (
    <div className='border-t border-b bg-gray-50 text-center'>
      <div className='inline-flex items-center justify-center border border-gray-400 px-5 py-2 my-5 mx-3 rounded-full w-3/4 sm:w-1/2'>
        <input
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          onKeyUp={(e) => {
            if (e.key === 'Enter') {
              handleSearch();
            }
          }}
          className='flex-1 outline-none bg-inherit text-sm'
          type="text"
          placeholder='Search'
        />
        <div className='flex gap-3'>
          <img className='w-4 cursor-pointer' src={SearchImage} alt="Search" onClick={handleSearch} />
          <img className='inline w-3 h-4 cursor-pointer' src={CrossImage} alt="Cross" onClick={() => setIsSearchVisible(false)} />
        </div>
      </div>
    </div>
  ) : null;
};

export default Search;