import React, { ReactElement } from "react";

export default function CheckOutDetails(): ReactElement {
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
  return (
    <div className="form-left">
      {CHECKOUT_ENTITIES.map(({ name, type }) => (
        <div className="row" key={name}>
          <label htmlFor={name}>{name}</label>
          <input type={type} name={name} id={name} />
        </div>
      ))}
    </div>
  );
}
