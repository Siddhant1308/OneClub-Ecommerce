import React, { useState } from 'react';
import LogoImage from '../assets/oneclub.jpg';
import { NavLink } from 'react-router-dom';
import ListItems from './ListItems';
import AdminOrders from './AdminOrders';
import AllVendors from './AllVendors';

const Admin = () => {
  const [activeSection, setActiveSection] = useState('list');

  return (
    <div className="flex flex-col">

      {/* Top Navbar */}
      <div className="flex items-center justify-between px-4 sm:px-8 py-4 border-b bg-white">
        <div className="flex items-center gap-4">
          <img
            src={LogoImage}
            alt="logo"
            className="w-20 sm:w-28 rounded-3xl cursor-pointer hover:scale-105 transition-transform"
          />
        </div>

        <div className="flex gap-2 sm:gap-4">

          <button
            onClick={() => setActiveSection('list')}
            className={`flex items-center gap-2 px-3 py-1 rounded ${activeSection === 'list' ? 'bg-black text-white' : 'border border-gray-400 text-gray-700 hover:bg-gray-100'}`}
          >
            <span className="hidden sm:inline">List Items</span>
          </button>
         
          <button
            onClick={() => setActiveSection('orders')}
            className={`flex items-center gap-2 px-3 py-1 rounded ${activeSection === 'orders' ? 'bg-black text-white' : 'border border-gray-400 text-gray-700 hover:bg-gray-100'}`}
          >
            <span className="hidden sm:inline">Orders</span>
          </button>

          <button
            onClick={() => setActiveSection('vendors')}
            className={`flex items-center gap-2 px-3 py-1 rounded ${activeSection === 'vendors' ? 'bg-black text-white' : 'border border-gray-400 text-gray-700 hover:bg-gray-100'}`}
          >
            <span className="hidden sm:inline">All Vendors</span>
          </button>

          <NavLink to="/">
            <button className="bg-black text-white rounded px-4 py-1">
              Logout
            </button>
          </NavLink>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4">
         {activeSection === 'list' && <ListItems />}
         {activeSection === 'vendors' && <AllVendors /> }
        {activeSection === 'orders' && <AdminOrders />}
      </div>
    </div>
  );
};

export default Admin;