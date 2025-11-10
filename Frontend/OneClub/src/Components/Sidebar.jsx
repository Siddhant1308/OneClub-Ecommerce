import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FiChevronLeft } from 'react-icons/fi';
import { CgProfile } from "react-icons/cg";
import { FaRegHeart } from "react-icons/fa";
import { GoClock } from "react-icons/go";
import { AiOutlinePoweroff } from "react-icons/ai";
import { RiAdminLine } from "react-icons/ri";
import { IoIosLogIn } from "react-icons/io";
import SidebarItem from './SideBarItem';
import { LoginContext } from '../Contexts/LoginContext';

const Sidebar = ({ visible, setVisible }) => {
  const { isLoggedIn, setIsLoggedIn } = useContext(LoginContext);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  return (
    <div
      className={`fixed top-0 right-0 h-screen z-50 bg-white overflow-hidden shadow transition-all duration-300 ${
        visible ? 'w-[210px]' : 'w-0'
      }`}
    >
      <div className='flex flex-col text-gray-600 h-full'>
        {/* Close Button */}
        <div onClick={() => setVisible(false)} className='flex items-center gap-4 p-3 cursor-pointer border-b'>
          <FiChevronLeft />
        </div>

        {/* Sidebar items */}
        <SidebarItem to="/Myprofile" icon={<CgProfile className="text-xl" />} label="MY PROFILE" onClick={() => setVisible(false)} />
        <SidebarItem to="/Favorite" icon={<FaRegHeart className="text-xl" />} label="WATCHLIST" onClick={() => setVisible(false)} />
        <SidebarItem to="/Admin" icon={<RiAdminLine className="text-xl" />} label="ADMIN PANEL" onClick={() => setVisible(false)} />
        <SidebarItem to="/Vendor" icon={<RiAdminLine className="text-xl" />} label="VENDOR" onClick={() => setVisible(false)} />
        <SidebarItem to="/OrderHistory" icon={<GoClock className="text-xl" />} label="ORDER HISTORY" onClick={() => setVisible(false)} />

        {/* Login / Logout */}
        <div className="flex justify-between items-center border-white rounded shadow mb-4 hover:shadow-lg transition-transform hover:scale-105 p-4 hover:text-red-500 text-[16px]">
          {!isLoggedIn ? (
            <div className='flex items-center gap-3'>
              <IoIosLogIn className='text-xl' />
              <Link to="/login" onClick={() => setVisible(false)} className="flex items-center gap-3">
                LOGIN
              </Link>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <AiOutlinePoweroff className="text-xl" />
              <button onClick={() => { handleLogout(); setVisible(false); }}>
                LOGOUT
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;