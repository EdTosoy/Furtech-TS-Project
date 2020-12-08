import React, { ReactElement } from "react";
import {
  useCartListQuery,
  useRemoveFromCartMutation,
} from "../../generated/graphql";

export default function CartList(): ReactElement {
  const { data } = useCartListQuery();
  const [removeFromCart] = useRemoveFromCartMutation();

  if (data!.cartList!.length === 0)
    return <div className="empty-cart">Your Cart is Empty</div>;

  return (
    <div className="list-wrapper">
      {data!.cartList!.map(({ id, name, price, username }) => (
        <div className="item-wrapper" key={id}>
          <p className="item-name">{name}</p>
          <p className="item-price">${price}</p>
          <p
            onClick={async () => {
              await removeFromCart({
                variables: {
                  id: id!,
                  username: username!,
                },
              });
            }}
          >
            del
          </p>
        </div>
      ))}
    </div>
  );
}
