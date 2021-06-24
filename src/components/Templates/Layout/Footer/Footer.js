import { Link } from "gatsby";
import React from "react";
import "./Footer.scss";

export default function Footer() {
  return (
    <nav
      id="footer"
      className="d-flex flex-wrap justify-content-end align-items-center bg-primary p-3"
    >
      <span id="copyright" className="me-auto text-white">
        Copyright &copy; {new Date().getFullYear()} Muhymin All Rights Reserved
      </span>
      <Link to="/about">About</Link>
      <Link to="/terms">Terms</Link>
      <Link to="/privacy-policy">Privacy Policy</Link>
      <Link to="/blog">Blog</Link>
      <Link to="/contact">Contact</Link>
    </nav>
  );
}
