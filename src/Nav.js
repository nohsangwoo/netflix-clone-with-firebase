import React, { useState, useEffect } from "react";
import "./Nav.css";

function Nav() {
  const [show, handleShow] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        handleShow(true);
      } else {
        handleShow(false);
      }

      return () => {
        window.removeEventListener("scroll");
      };
    });
  }, []);
  return (
    <div className={`nav ${show && "nav__black"}`}>
      <img
        className="nav__logo"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Logo_Netflix.png/1200px-Logo_Netflix.png"
        alt="Netflix Logo"
      />
      <img
        className="nav__avatar"
        src="https://occ-0-1007-3996.1.nflxso.net/dnm/api/v6/0RO1pLmU93-gdXvuxd_iYjzPqkc/AAAABZiSyrRci77umHuATdA0OCHdMx0Bb2mWhVc0ihermsQZehGuoO-ugrnHy8u8EoOh5NoAIDZTs4DzBgQKUJ8_GMvr3y4R.png"
        alt="Netflix Avatar"
      />
    </div>
  );
}

export default Nav;
