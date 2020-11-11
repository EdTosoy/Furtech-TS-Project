import React, { useContext, ReactElement } from "react";
import { NavLink } from "react-router-dom";

import "./Navigation.scss";
import { MenuContext } from "../../ContextApi/menuContext";
export default function Navigation(): ReactElement {
  const { dropMenu, setDropMenu } = useContext(MenuContext);
  const dropMenuStyle = dropMenu ? { display: "block" } : { display: "none" };
  const handleClick = () => {
    setDropMenu((prevValue) => !prevValue);
  };
  return (
    <>
      <ul className="navigation">
        <li>
          <NavLink exact to="/" activeClassName="selected">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/shopping/chairs" activeClassName="selected">
            Shopping
          </NavLink>
        </li>
        <li>
          <a href="/#collection">Furtech Collection</a>
        </li>
        <li>
          <a href="/#partners">Our Partners</a>
        </li>
        <li>
          <NavLink exact to="/about" activeClassName="selected">
            About Us
          </NavLink>
        </li>
      </ul>
      <div className="drop-down" style={dropMenuStyle} onClick={handleClick}>
        <ul className="menu-panel">
          <li>
            <NavLink exact to="/" activeClassName="selected">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/shopping/chairs" activeClassName="selected">
              Shopping
            </NavLink>
          </li>
          <li>
            <a href="/#collection">Furtech Collection</a>
          </li>
          <li>
            <a href="/#partners">Our Partners</a>
          </li>
          <li>
            <NavLink exact to="/about" activeClassName="selected">
              About Us
            </NavLink>
          </li>
        </ul>
      </div>
    </>
  );
}
