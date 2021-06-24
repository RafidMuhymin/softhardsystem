import { Link } from "gatsby";
import React, { useEffect } from "react";
import Search from "../../../Shared/Search/Search";
import "./Navbar.scss";
import logo from "../../../../../static/logo.svg";

export default function Navbar() {
  useEffect(() => {
    document.querySelector("#layout").style.overflowY = "visible";
    document.body.style.overflowY = "scroll";
    window.addEventListener("resize", () => {
      if (window.innerWidth > 767) {
        document.querySelector("#collapse").checked = false;
        document.querySelector("#layout").style.overflowY = "visible";
        document.body.style.overflowY = "scroll";
      }
    });
  }, []);
  return (
    <nav
      id="main-menu"
      className="p-0 py-md-2 px-md-3 d-flex flex-wrap align-items-center justify-content-end bg-primary w-100 top-0 start-0 z-1"
    >
      <div className="logobar me-0 me-md-auto py-2 px-3 p-md-0 w-100 d-flex align-items-center justify-content-between">
        <Link id="brand-logo" to="/">
          <img src={logo} alt="The Muhymin Blog Logo" />
        </Link>
        <label
          htmlFor="collapse"
          className="p-2 d-md-none d-flex align-items-center cursor-pointer"
        >
          <div id="hamburger-icon" className="p-2 cursor-pointer">
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
          </div>
        </label>
      </div>
      <div className="collapsible-menu text-center d-md-block d-flex flex-column align-items-center w-100 position-fixed z-1">
        <Link activeClassName="active-link" to="/home">
          Home
        </Link>
        <Link activeClassName="active-link" to="/about">
          About
        </Link>
        <Link activeClassName="active-link" to="/blog">
          Blog
        </Link>
        <Link activeClassName="active-link" to="/contact">
          Contact
        </Link>
        <Search></Search>
      </div>
    </nav>
  );
}