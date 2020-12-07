import React, { ReactElement } from "react";
import { useCartListQuery } from "../../generated/graphql";

export default function CartList(): ReactElement {
  const { data } = useCartListQuery();

  if (data?.cartList?.length === 0)
    return <div className="empty-cart">Your Cart is Empty</div>;

  return (
    <div className="list-wrapper">
      {data?.cartList!.map(({ id, name, price }) => (
        <div className="item-wrapper" key={id}>
          <p className="item-name">{name}</p>
          <p className="quantity">Quantity: 1</p>
          <p className="item-price">${price}</p>
        </div>
      ))}
    </div>
  );
}
