  import React, { useState, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import searchImage from '../assets/search.png';
import MenuImage from '../assets/menu.png';
import logoImage from '../assets/oneclub.jpg';
import { SearchContext } from '../Contexts/SearchContext';
import { AuthContext } from '../Contexts/AuthContext';
import { FiList } from 'react-icons/fi';
import Sidebar from './Sidebar';

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  const { navigate, setIsSearchVisible } = useContext(SearchContext);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/login');
  };

  return (
    <div className='flex items-center justify-between py-5 text-xl'>
      {/* Logo */}
      <NavLink to='/'>
        <img src={logoImage} className='w-32 rounded-3xl cursor-pointer' alt='logo' />
      </NavLink>

      {/* Desktop Nav Links */}
      <ul className='hidden sm:flex gap-8 text-sm text-gray-800'>
        <NavLink to='/' className='flex flex-col items-center gap-1'>
          <p>HOME</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
        </NavLink>
        <NavLink to='/Collections' className='flex flex-col items-center gap-1'>
          <p>COLLECTION</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
        </NavLink>
        <NavLink to='/cart' className='flex flex-col items-center gap-1'>
          <p>CART</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
        </NavLink>
        <NavLink to='/Contact' className='flex flex-col items-center gap-1'>
          <p>CONTACT</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
        </NavLink>
      </ul>

      {/* Icons */}
      <div className='flex items-center gap-6'>
        <img src={searchImage} onClick={() => setIsSearchVisible(true)} className='w-5 cursor-pointer' alt='search' />
        <FiList className='w-5 h-5 cursor-pointer' onClick={() => setVisible(true)} />
        {/* Sidebar */}
        <Sidebar visible={visible} setVisible={setVisible} isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
      </div>
    </div>
  );
};

export default Navbar;