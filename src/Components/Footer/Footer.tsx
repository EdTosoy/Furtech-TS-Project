import React, { ReactElement } from "react";

import "./Footer.scss";
import CompanyInfo from "./CompanyInfo";
import GetInTouch from "./GetInTouch";
export default function Footer(): ReactElement {
  return (
    <footer>
      <div className="footer-content">
        <CompanyInfo />
        <GetInTouch />
      </div>
    </footer>
  );
}
