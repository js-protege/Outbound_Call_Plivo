import React from "react";
import "./Overlay.css";

export default function Overlay({ show, backdropClicked }) {
  return show ? (
    <div className="overlay" onClick={backdropClicked}></div>
  ) : null;
}
