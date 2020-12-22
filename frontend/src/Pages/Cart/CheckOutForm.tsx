import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { ReactElement, useState } from "react";
import { useChargeMutation } from "../../generated/graphql";
interface Props {}

export default function CheckOutForm({}: Props): ReactElement {
  const [onProcess, setOnProcess] = useState(false);
  const CHECKOUT_ENTITIES = [
    {
      name: "Name",
      type: "text",
    },
    {
      name: "Email",
      type: "email",
    },
    {
      name: "Address",
      type: "text",
    },
    {
      name: "City",
      type: "text",
    },
    {
      name: "State",
      type: "text",
    },
    {
      name: "Zip",
      type: "number",
    },
  ];

  const stripe = useStripe();
  const elements = useElements();
  const [charge] = useChargeMutation();
  const handleSubmit = async (
    //@ts-ignore
    event: MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();

    if (stripe && elements) {
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card: elements.getElement("card")!,
      });
      if (!error) {
        //@ts-ignore
        const { id } = paymentMethod;

        try {
          const { data } = await charge({
            variables: {
              id,
              amount: 1099,
            },
          });
          console.log(data);
        } catch (error) {
          console.error(error);
        }
      }
    }
  };

  return (
    <form className="check-out-wrapper">
      <div className="form-left">
        {CHECKOUT_ENTITIES.map(({ name, type }) => (
          <div className="row" key={name}>
            <label htmlFor={name}>{name}</label>
            <input type={type} name={name} id={name} />
          </div>
        ))}
      </div>
      <div className="form-right">
        <p>
          Total number of Items: <span>15</span>
        </p>
        <p>
          Total: <span>$6565</span>
        </p>
        <CardElement />

        <button type="submit" disabled={onProcess} onClick={handleSubmit}>
          Pay
        </button>
      </div>
    </form>
  );
}
