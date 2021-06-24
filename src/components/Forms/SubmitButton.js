import React from "react";
import "./SubmitButton.scss";

export default function SubmitButton({ boolean, id, className, value }) {
  return (
    <button id={id} className={className} type="submit" disabled={boolean}>
      {!boolean ? <>{value}</> : <div className="mx-auto"></div>}
    </button>
  );
}
