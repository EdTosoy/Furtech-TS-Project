import React, { ReactElement } from "react";

import { loadStripe } from "@stripe/stripe-js";

import { Elements } from "@stripe/react-stripe-js";

import "./CheckOut.scss";
import CheckOutForm from "./CheckOutForm";

export default function CheckOut(): ReactElement {
  const stripePromise = loadStripe(
    "pk_test_51I0hdrLCnusGqFH6e9hxxFjBrXzIxXt0aaNkkNdUuK2RsZT8pHG3Q0jRUMKxAXlc4I46Naf1mQozk7No9Gw7BDG600wLMVJLTO"
  );

  return (
    <div className="check-out">
      <div className="check-out-content">
        <Elements stripe={stripePromise}>
          <CheckOutForm />
        </Elements>
      </div>
    </div>
  );
}
