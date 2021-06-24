import React from "react";
import "./Fallback.scss";

export default function Fallback() {
  return (
    <div
      id="loading-spinner"
      className="d-flex justify-content-center align-items-center w-100"
    >
      <div></div>
    </div>
  );
}
