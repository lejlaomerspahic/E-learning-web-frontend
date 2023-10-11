import React, { useState } from "react";
import { FaTimes, FaBars } from "react-icons/fa";

import "./Navbar.css";
import { SidebarData } from "../Sidebar";

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    console.log("Toggle sidebar function called");
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <nav
      className="navbar"
      style={{
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "row",
        backgroundColor: "navy",
        color: "white",
        paddingLeft: "20px",
        paddingRight: "20px",
      }}
    >
      <div className="menu-toggle" onClick={toggleSidebar}>
        {isSidebarOpen ? <FaTimes /> : <FaBars />}
      </div>
      <div className={`sidebar ${isSidebarOpen ? "sidebar-open" : ""}`}>
        <ul
          style={{
            listStyleType: "none",
            marginTop: "50px",
            marginLeft: "10px",
          }}
        >
          {SidebarData.map((item, index) => (
            <li
              className="li"
              style={{
                padding: "10px",
                width: "210px",
                cursor: "pointer",
                justifyContent: "center",
              }}
              key={index}
              onClick={() => (window.location.pathname = item.link)}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  flexDirection: "row",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <div style={{ fontSize: "16px" }}>{item.icon}</div>
                  <div
                    style={{
                      marginLeft: "10px",
                      marginTop: "5px",
                      fontSize: "16px",
                    }}
                  >
                    {item.title}
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <ul className="ulul">
        <li className="nav-item">Home</li>
        <li className="nav-item">About</li>
        <li className="nav-item">Cart</li>
      </ul>
      <ul className="ulul">
        <li className="nav-item user-section">
          <div className="user-icon"></div>
          <div className="user-info">Hello, Ime Usera</div>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
