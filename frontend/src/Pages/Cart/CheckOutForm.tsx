import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { StripeCardElementOptions } from "@stripe/stripe-js";
import React, { ReactElement, useState } from "react";
import { useCartListQuery, useChargeMutation } from "../../generated/graphql";
import CheckOutDetails from "./CheckOutDetails";
import { useHistory } from "react-router-dom";

export default function CheckOutForm(): ReactElement {
  const [onProcess, setOnProcess] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const [charge] = useChargeMutation();
  const { data } = useCartListQuery();
  let history = useHistory();

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
  const handleSubmit = async (e: MouseEvent) => {
    e.preventDefault();
    setOnProcess(true);
    if (stripe && elements) {
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card: elements.getElement("card")!,
      });
      if (error) console.error(error);
      if (paymentMethod?.id) {
        setOnProcess(false);
        const { id } = paymentMethod;
        try {
          await charge({
            variables: {
              id,
              amount: cartTotal! * 100,
            },
          });
          history.push("/");
          window.location.reload();
        } catch (error) {
          console.error(error);
        }
      }
    }
  };

  const cardElementOptions: StripeCardElementOptions = {
    style: {
      base: {
        fontSize: "16px",
        color: "#d23e3e",
        "::placeholder": {
          color: "#696969",
        },
      },
      invalid: {
        color: "#DC143C",
      },
      complete: {
        iconColor: "#0000A0",
      },
    },
    hidePostalCode: true,
  };

  return (
    <form className="check-out-wrapper">
      <CheckOutDetails />
      <div className="form-right">
        <p>
          Total number of Items: <span>{cartItems}</span>
        </p>
        <p>
          Total: <span>${cartTotal}</span>
        </p>
        <CardElement options={cardElementOptions} />

        {/*
          //@ts-ignore*/}
        <button type="submit" disabled={onProcess} onClick={handleSubmit}>
          {onProcess ? "Processing..." : "Pay"}
        </button>
      </div>
    </form>
  );
}
