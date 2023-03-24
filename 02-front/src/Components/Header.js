import React from "react";
import { NavLink } from "react-router-dom";
import classes from "./Header.module.css";

function Header() {
  return (
    <div className={classes.Header}>
      <nav className={classes.topnav}>
        <NavLink className="" to="/Home">
          Home
        </NavLink>
        <NavLink className={classes.link} to="/addProduct">
          Add Product
        </NavLink>
      </nav>
    </div>
  );
}

export default Header;
