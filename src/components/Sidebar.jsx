import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Logo from "../assets/Logo.png";
import users from "../assets/users.png";
import records from "../assets/records.png";
import settings from "../assets/settings.png";
import logout from "../assets/logout.png";
import del from "../assets/delUser.png";
import { RxDashboard } from "react-icons/rx";
import {  signOut } from "firebase/auth";
import { auth } from '../firebase/firebase'


const Sidebar = () => {
  const navigate = useNavigate();
  const [logoutmodal, setLogoutModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handlelogoutClick = () => {
    setLogoutModal(true);
    document.body.style.overflow = "hidden"; 
  };

  const handleCloseModal = () => {
    setLogoutModal(false);
    document.body.style.overflow = "auto"; 
  };

  const handleLogoutNavigate = () => {
    setIsLoading(true); 
    signOut(auth).then(()=>{
      navigate("/")
      console.log("Signed out successfuly")
    }).catch((error)=>{
      console.log("Lougout Error", error)
    })
  };

  // Menu items
  const menuItems = [
    {
      name: "Dashboard",
      icon: <RxDashboard size={20} className="text-[#475569]" />,
      path: "/dashboard",
    },
    {
      name: "User",
      icon: <img src={users} alt="Users" className="w-5 h-5" />,
      path: "/users",
    },
    {
      name: "Records",
      icon: <img src={records} alt="Records" className="w-6 h-6" />,
      path: "/records",
    },
  ];

  return (
    <>
      <div className="w-[240px] h-screen flex flex-col bg-white shadow-lg fixed top-0 left-0 overflow-y-auto font-inter z-20">
        {/* Logo */}
        <div className="mt-10 flex justify-center">
          <img src={Logo} alt="Logo" className="w-[180px] h-[48px]" />
        </div>

        {/* Menu Items */}
        <nav className="flex flex-col gap-2 mt-10 flex-grow">
          {menuItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) => `
                flex items-center w-[175px] h-[50px] justify-start gap-3 p-3 rounded-md transition ml-5
                ${isActive ? "bg-[#0857A3] text-white" : "text-black"}
              `}
            >
              <span
                className={`${window.location.pathname.startsWith(item.path)
                    ? "filter brightness-0 invert"
                    : ""
                  }`}
              >
                {item.icon}
              </span>
              <span>{item.name}</span>
            </NavLink>
            
          ))}
          <hr className="text-[#CBD5E1] mt-1" />
        </nav>

        {/* Bottom Menu */}
        <div className="mt-auto mb-3">
          <hr className="text-[#CBD5E1] mb-3" />
          <NavLink
            to="/settings"
            className={({ isActive }) => `
              flex items-center w-[175px] h-[50px] justify-start gap-3 p-3 rounded-md transition ml-5
              ${isActive ? "bg-[#0857A3] text-white" : "text-black"}
            `}
          >
            <span
              className={`${window.location.pathname.startsWith("/settings")
                  ? "filter brightness-0 invert"
                  : ""
                }`}
            >
              <img src={settings} alt="Settings" className="w-5 h-5" />
            </span>
            <span>Settings</span>
          </NavLink>

          {/* Logout Button */}
          <button
            onClick={handlelogoutClick}
            className="flex items-center w-[192px] h-[50px] justify-start gap-3 p-3 rounded-md transition ml-5 text-red-500"
          >
            <img src={logout} alt="Logout" className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Logout Modal */}
      {logoutmodal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="w-[90%] md:w-[500px] bg-white rounded-[20px] p-[30px] z-60 shadow-lg">
            <img src={del} alt="Logout" className="w-14 h-14 mx-auto" />
            <h1 className="text-[#E63946] mt-[22px] font-[600] text-[24px] text-center">
              Do you really want to Logout?
            </h1>
            <div className="flex justify-center mt-5 space-x-4">
              <button
                onClick={handleLogoutNavigate}
                className="text-[#E63946] border border-[#E63946] w-[140px] h-[40px] rounded-[1234px] hover:bg-[#E63946] hover:text-white"
              >
                Yes
              </button>
              <button
                onClick={handleCloseModal}
                className="text-white bg-[#0857A3] w-[140px] h-[40px] rounded-[1234px] hover:bg-white hover:text-[#0857A3] hover:border hover:border-[#0857A3]"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
          <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12"></div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
