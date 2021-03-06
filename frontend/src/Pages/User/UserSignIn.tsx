import React, { ReactElement } from "react";
import SignIn from "./SignIn";

import "./User.scss";

export default function UserSignIn(): ReactElement {
  return (
    <div className="auth">
      <div className="auth-content">
        <div className="text">
          <h1>FURTECH</h1>
          <h2>
            We aim to be the absolute resource for businesses and restaurants
            partner for their success.
          </h2>
          <p>Join us, Lets make awesome designs.</p>
        </div>
        <SignIn />
      </div>
    </div>
  );
}
