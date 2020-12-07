import React, { ReactElement, useContext } from "react";
import { MenuContext } from "../../ContextApi/menuContext";

import cartSVG from "./media/cart.svg";
import personSVG from "./media/person.svg";
import logoutSVG from "./media/logout.svg";
import "./User.scss";
import { useMeQuery, useLogoutMutation } from "../../generated/graphql";
import { setAccessToken } from "../../accessToken";
import { useHistory } from "react-router-dom";

export default function User(): ReactElement {
  let history = useHistory();
  const { setDropMenu } = useContext(MenuContext);
  const { data } = useMeQuery({
    fetchPolicy: "network-only",
  });
  const [logout, { client }] = useLogoutMutation();

  const handleDrop = () => {
    setDropMenu((prevValue: Boolean) => !prevValue);
  };
  const handleLogout = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    await logout();
    setAccessToken("");
    await client.resetStore();
    history.push("/user/SignIn");
    window.location.reload();
  };

  return (
    <ul className="user">
      <li className="cart-btn">
        <a href="/cart">
          <img src={cartSVG} alt="cart" />
        </a>
      </li>
      <li className="user-btn">
        {!data?.me?.username ? (
          <a href="/user/SignIn">
            <img src={personSVG} alt="person" />
          </a>
        ) : (
          <a href="/user/SignIn" onClick={handleLogout}>
            <img src={logoutSVG} alt="logout" />
          </a>
        )}
      </li>
      <li className="drop-down-btn" onClick={handleDrop}>
        <div>
          <ion-icon name="chevron-down-outline"></ion-icon>
        </div>
      </li>
    </ul>
  );
}
