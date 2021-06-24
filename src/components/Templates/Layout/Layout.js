/* eslint-disable import/first */
if (process.env.NODE_ENV === "development") {
  require("preact/debug");
}
import React from "react";
import Footer from "./Footer/Footer";
import Navbar from "./Navbar/Navbar";
import SEO from "./SEO";
import "./bootstrap.css";
import "./Layout.scss";

export default function Layout({
  description,
  meta,
  imagePath,
  imageAlt,
  imageHeight,
  imageWidth,
  imageType,
  title,
  twitterId,
  type,
  children,
}) {
  return (
    <div id="layout">
      <SEO
        description={description}
        meta={meta}
        imagePath={imagePath}
        imageAlt={imageAlt}
        imageHeight={imageHeight}
        imageWidth={imageWidth}
        imageType={imageType}
        title={title}
        twitterId={twitterId}
        type={type}
      ></SEO>
      <input
        type="checkbox"
        id="collapse"
        className="d-none"
        onClick={(e) => {
          if (e.target.checked === true) {
            document.querySelector("#layout").style.overflowY = "hidden";
            document.body.style.overflowY = "hidden";
          } else {
            document.querySelector("#layout").style.overflowY = "visible";
            document.body.style.overflowY = "scroll";
          }
        }}
      />
      <Navbar />
      <section id="primary" className="m-auto">
        {children}
      </section>
      <Footer />
    </div>
  );
}