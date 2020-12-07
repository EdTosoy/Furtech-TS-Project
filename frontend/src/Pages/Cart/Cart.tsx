import React, { ReactElement } from "react";
import { useHistory } from "react-router-dom";
import { useMeQuery } from "../../generated/graphql";

import "./Cart.scss";
import CartList from "./CartList";
import CartSummary from "./CartSummary";

export default function Cart(): ReactElement {
  let history = useHistory();

  const { data } = useMeQuery({
    fetchPolicy: "network-only",
  });
  if (data && data.me?.username == null) {
    history.push("/user/SignIn");
  }

  return (
    <div className="cart">
      <div className="cart-content">
        <div className="cart-wrapper">
          <div className="cart-list">
            <h1>Cart Items</h1>
            <CartList />
          </div>
          <div className="cart-total">
            <h1>Cart Summary</h1>
            <CartSummary />
          </div>
        </div>
      </div>
    </div>
  );
}
