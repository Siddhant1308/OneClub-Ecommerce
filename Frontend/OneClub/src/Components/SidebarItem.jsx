import React from 'react';
import { NavLink } from 'react-router-dom';

const SidebarItem = ({ to, icon, label, onClick }) => {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      className="flex justify-between items-center border-white rounded shadow  hover:shadow-lg transition-transform hover:scale-102 p-4 hover:text-black"
    >
      <div className="flex items-center gap-3">
        {icon}
        <span className="text-[16px]">{label}</span>
      </div>
    </NavLink>
  );
};

export default SidebarItem;