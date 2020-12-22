import React, { ReactElement } from "react";
import { useCartListQuery } from "../../generated/graphql";

export default function CartSummary(): ReactElement {
  const { data } = useCartListQuery();

  let cartTotal: number | undefined = 0;
  let cartItems: number | undefined = 0;
  if (data?.cartList?.length === 0) {
    cartTotal = 0;
    cartItems = 0;
  } else {
    data?.cartList!.forEach(({ price }) => {
      cartTotal! += price!;
    });
  }

  cartItems = data?.cartList?.length;

  return (
    <>
      <p>
        Total Number of Items: <span>{cartItems}</span>
      </p>
      <p>
        Total Cause: <span>${cartTotal}</span>
      </p>
      <button>Proceed</button>
    </>
  );
}
