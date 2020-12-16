import React, { ReactElement } from "react";
import { useParams } from "react-router-dom";

import tables from "./data/tablesData.json";
import chairs from "./data/chairsData.json";
import lights from "./data/lightsData.json";

import "./MainShowcase.scss";
import { useAddToCartMutation, useMeQuery } from "../../generated/graphql";

export default function MainShowcase(): ReactElement {
  interface DataType {
    id: number;
    name: string;
    url: string;
    price: number;
  }
  interface ParamType {
    category: string;
  }
  const categoryData = [chairs, tables, lights];

  const { category } = useParams<ParamType>();
  let product: any;
  switch (category) {
    case "chairs":
      product = 0;
      break;
    case "tables":
      product = 1;
      break;
    case "lights":
      product = 2;
      break;
    default:
      product = 0;
      break;
  }
  const [addToCart] = useAddToCartMutation();

  const { data } = useMeQuery();

  let username: string;
  if (data?.me?.username) {
    username = data.me.username;
  } else {
    username = " ";
  }

  return (
    <div className="main-showcase">
      {categoryData[product].map(({ id, name, url, price }: DataType) => (
        <div
          className="card"
          key={id}
          style={{ backgroundImage: `url("${url}")` }}
          onClick={async () => {
            await addToCart({
              variables: {
                name,
                price,
                username,
              },
            });
          }}
        >
          <div className="text">
            <h1>{name}</h1>
            <p>${price}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
