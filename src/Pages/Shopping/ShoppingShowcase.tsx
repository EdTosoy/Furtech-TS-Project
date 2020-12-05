import React, { ReactElement } from "react";
import CategoryNav from "./CategoryNav";
import MainShowcase from "./MainShowcase";

export default function ShoppingShowcase(): ReactElement {
  return (
    <div className="shopping-showcase">
      <div className="shopping-showcase-content">
        <CategoryNav />
        <MainShowcase />
      </div>
    </div>
  );
}
