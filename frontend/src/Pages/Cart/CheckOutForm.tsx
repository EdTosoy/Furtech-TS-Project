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
    setOnProcess(true);

    if (stripe && elements) {
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card: elements.getElement("card")!,
      });
      if (paymentMethod?.id) {
        setOnProcess(false);
      }
      // const confirmedCardPayment = await stripe.confirmCardPayment(
      //   process.env.SECRET_KEY!,
      //   {
      //     payment_method: paymentMethod?.id,
      //   }
      // );
      // console.log(confirmedCardPayment);
      if (!error) {
        //@ts-ignore
        const { id } = paymentMethod;

        try {
          await charge({
            variables: {
              id,
              amount: 1099,
            },
          });
        } catch (error) {
          console.error(error);
        }
      }
    }
  };

  const cardElementOptions = {
    style: {
      base: {
        fontSize: "16px",
        color: "#d23e3e",
        "::placeholder": {
          color: "#696969",
        },
      },
      invalid: {},
    },
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
        <CardElement options={cardElementOptions} />

        <button type="submit" disabled={onProcess} onClick={handleSubmit}>
          {onProcess ? "Processing..." : "Pay"}
        </button>
      </div>
    </form>
  );
}
