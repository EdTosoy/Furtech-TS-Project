import React, { ReactElement } from "react";

import "./Cart.scss";

export default function Cart(): ReactElement {
  return (
    <div className="cart">
      <div className="cart-content">
        <div className="cart-wrapper">
          <div className="cart-list">
            <h1>Cart Items</h1>
            <div className="list-wrapper">
              <div className="item-wrapper">
                <p className="item-name">Luis Dark Gray</p>
                <p className="quantity">Quantity: 4</p>
                <p className="item-price">$190</p>
              </div>
            </div>
          </div>
          <div className="cart-total">
            <h1>Cart Summary</h1>
            <p>
              Total Number of Items: <span>13</span>
            </p>
            <p>
              Total Cause: <span>$12442</span>
            </p>
            <button>Procede</button>
          </div>
        </div>
      </div>
    </div>
  );
}
