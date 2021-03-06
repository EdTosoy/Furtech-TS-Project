import React, { ReactElement } from "react";
import {
  useCartListQuery,
  useRemoveFromCartMutation,
} from "../../generated/graphql";

export default function CartList(): ReactElement {
  const { data } = useCartListQuery();
  const [removeFromCart] = useRemoveFromCartMutation();

  if (data?.cartList?.length === 0) {
    return <div className="empty-cart">Your Cart is Empty</div>;
  }

  return (
    <div className="list-wrapper">
      {data?.cartList?.map(({ id, name, price, username }) => (
        <div className="item-wrapper" key={id}>
          <p className="item-name">{name}</p>
          <p className="item-price">${price}</p>
          <div
            className="remove"
            onClick={async () => {
              try {
                await removeFromCart({
                  variables: {
                    id: id!,
                    username: username!,
                  },
                  update: (cache) => {
                    cache.evict({ id: `CartList:${id}` });
                  },
                });
              } catch (error) {
                console.log(error);
              }
            }}
          >
            <ion-icon name="bag-remove-outline"></ion-icon>
          </div>
        </div>
      ))}
    </div>
  );
}
