import React, { ReactElement } from "react";
import Logo from "./Logo";
import Navigation from "./Navigation";
import User from "./User";
import "./Header.scss";

export default function Header(): ReactElement {
  return (
    <header>
      <div className="header-content">
        <Logo />
        <Navigation />
        <User />
      </div>
    </header>
  );
}
