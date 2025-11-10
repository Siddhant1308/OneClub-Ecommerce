import React, { useState } from 'react';
import LogoImage from '../assets/oneclub.jpg';
import OrderImage from '../assets/order.png';
import { NavLink } from 'react-router-dom';
import AddItems from './AddItems';
import ListItems from './ListItems';
import AdminOrders from './AdminOrders';
import VendorProducts from './VendorProducts';

const Vendor = () => {
    const [activeSection, setActiveSection] = useState('product');

    return (
        <div className="flex flex-col">

            {/* Top Navbar */}
            <div className="flex items-center justify-between px-4 sm:px-8 py-4 border-b bg-white">
                <div className="flex items-center gap-4">
                    <NavLink to="/">
                        <img
                            src={LogoImage}
                            alt="logo"
                            className="w-20 sm:w-28 rounded-3xl cursor-pointer hover:scale-105 transition-transform"
                        />
                    </NavLink>
                </div>

                <div className="flex gap-2 sm:gap-4">

                    <button
                        onClick={() => setActiveSection('product')}
                        className={`flex items-center gap-2 px-3 py-1 rounded ${activeSection === 'product' ? 'bg-black text-white' : 'border border-gray-400 text-gray-700 hover:bg-gray-100'}`}
                    >
                        <span className="hidden sm:inline cursor-pointer">My Products</span>
                    </button>

                    <button
                        onClick={() => setActiveSection('add')}
                        className={`flex items-center gap-2 px-3 py-1 rounded ${activeSection === 'add' ? 'bg-black text-white' : 'border border-gray-400 text-gray-700 hover:bg-gray-100'}`}
                    >
                        <span className="hidden sm:inline cursor-pointer">Add Items</span>
                    </button>

                    <NavLink to="/">
                        <button className="bg-red text-black border border-l-black rounded px-4 py-1 cursor-pointer">
                            Back
                        </button>
                    </NavLink>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-4">
                {activeSection === 'product' && <VendorProducts />}
                {activeSection === 'add' && <AddItems />}
            </div>
        </div>
    );
};

export default Vendor;