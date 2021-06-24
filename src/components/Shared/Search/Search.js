import { navigate } from "gatsby-link";
import React from "react";
import { useLocation } from "@reach/router";
import "./Search.scss";

export default function Search() {
  const { pathname } = useLocation();

  const search = (evt) => {
    evt.preventDefault();
    const query = evt.target[0].value;
    if (pathname === `/search`) {
      document.querySelector("#collapse").checked = false;
      document.querySelector("#layout").style.overflowY = "visible";
      document.body.style.overflowY = "scroll";
    }
    navigate(`/search?${query}`);
  };
  return (
    <form
      id="search-widget"
      className="d-block d-md-inline position-relative"
      onSubmit={search}
    >
      <input
        className="form-control d-inline"
        type="text"
        placeholder="Search …"
        onSubmit={search}
        required
      />
      <input className="position-absolute end-0" type="submit" value="🔎" />
    </form>
  );
}