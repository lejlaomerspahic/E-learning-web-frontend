import React, { useEffect, useState } from "react";
import { FaTimes, FaBars } from "react-icons/fa";

import "./Navbar.css";
import { SidebarData } from "../Sidebar";

import { useUser } from "../hook/useUser";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { user } = useUser();
  const [imageUrl, setImageUrl] = useState();
  const navigate = useNavigate();
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const defaultImageUrl =
    "https://cdn1.iconfinder.com/data/icons/avatar-vol-8/512/15-512.png";

  useEffect(() => {
    if (user !== null) {
      setImageUrl(user?.user.picture || defaultImageUrl);
    }
  }, [user]);

  return (
    <div>
      {user !== null ? (
        <nav
          className="navbar"
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "row",
            backgroundColor: "rgba(10, 0, 100, 0.877)",
            color: "white",
            paddingLeft: "20px",
            paddingRight: "20px",
            paddingTop: "3px",
            paddingBottom: "3px",
          }}
        >
          <div className="menu-toggle" onClick={toggleSidebar}>
            {isSidebarOpen ? <FaTimes /> : <FaBars />}
          </div>
          <div className={`sidebar ${isSidebarOpen ? "sidebar-open" : ""}`}>
            <ul
              style={{
                listStyleType: "none",
                marginTop: "60px",
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
                  onClick={() => navigate(`${item.link}`)}
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
            <li className="nav-item" onClick={() => navigate("/home")}>
              Home
            </li>
            <li className="nav-item" onClick={() => navigate("/about")}>
              About
            </li>
            <li className="nav-item" onClick={() => navigate("/cart")}>
              Cart
            </li>
          </ul>
          <ul className="ulul">
            <li className="nav-item user-section">
              <div className="user-icon">
                <img style={{ width: "100%" }} src={imageUrl} alt="User Icon" />
              </div>
              <div className="user-info">Hello, {user?.user.username}</div>
            </li>
          </ul>
        </nav>
      ) : null}
    </div>
  );
};

export default Navbar;
