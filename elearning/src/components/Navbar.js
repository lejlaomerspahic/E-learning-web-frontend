import React, { useState } from "react";
import { FaBars } from "react-icons/fa";
import "./Navbar.css";

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <nav className="navbar" style={{ backgroundColor: "navy", color: "white" }}>
      <div className="menu-toggle" onClick={toggleSidebar}>
        <FaBars />
      </div>
      <ul
        className={`nav-list ${isSidebarOpen ? "sidebar-open" : ""}`}
        style={{ listStyleType: "none" }}
      >
        <li>
          <a href="/" style={{ color: "white", textDecoration: "none" }}>
            Početna
          </a>
        </li>
        <li>
          <a href="/about" style={{ color: "white", textDecoration: "none" }}>
            O nama
          </a>
        </li>
        <li>
          <a href="/contact" style={{ color: "white", textDecoration: "none" }}>
            Kontakt
          </a>
        </li>
      </ul>
      {isSidebarOpen && (
        <div
          className={`sidebar`}
          style={{ backgroundColor: "navy", color: "white" }}
        >
          <h2 style={{ textAlign: "center" }}>Bočni Meni</h2>
          <ul style={{ listStyleType: "none", padding: 0 }}>
            <li>
              <a
                href="/dashboard"
                style={{ color: "white", textDecoration: "none" }}
              >
                Dashboard
              </a>
            </li>
            <li>
              <a
                href="/profile"
                style={{ color: "white", textDecoration: "none" }}
              >
                Moj Profil
              </a>
            </li>
            <li>
              <a
                href="/settings"
                style={{ color: "white", textDecoration: "none" }}
              >
                Postavke
              </a>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
