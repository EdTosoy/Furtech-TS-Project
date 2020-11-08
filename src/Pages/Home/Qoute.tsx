import React, { ReactElement } from "react";
import qoute from "./media/qoute.png";
import "./Qoute.scss";

export default function Quote(): ReactElement {
  return (
    <div className="quote" data-scroll>
      <div className="qoute-content">
        <img src={qoute} alt="qoute" />
        <h1>
          The Details are not the details, <br /> They make the design.
        </h1>
        <p>
          <em>- Charles Eamess</em>
        </p>
      </div>
    </div>
  );
}
