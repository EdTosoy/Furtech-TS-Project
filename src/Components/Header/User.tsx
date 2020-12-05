import React, { ReactElement, useContext } from "react";
import { MenuContext } from "../../ContextApi/menuContext";

import cartSVG from "./media/cart.svg";
import personSVG from "./media/person.svg";
import "./User.scss";

export default function User(): ReactElement {
  const { setDropMenu } = useContext(MenuContext);

  const handleDrop = () => {
    setDropMenu((prevValue: Boolean) => !prevValue);
  };
  return (
    <ul className="user">
      <li className="cart">
        <a href="/auth/SignIn">
          <img src={cartSVG} alt="cart" />
        </a>
      </li>
      <li className="person">
        <a href="/auth">
          <img src={personSVG} alt="person" />
        </a>
      </li>
      <li className="drop-down-btn" onClick={handleDrop}>
        <div>
          <ion-icon name="chevron-down-outline"></ion-icon>
        </div>
      </li>
    </ul>
  );
}
