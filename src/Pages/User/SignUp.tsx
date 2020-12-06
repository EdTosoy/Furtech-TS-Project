import React, { ReactElement, useState } from "react";
import { useHistory } from "react-router-dom";

import { useRegisterMutation } from "../../generated/graphql";
export default function SignUp(): ReactElement {
  let history = useHistory();
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [register, { error }] = useRegisterMutation();

  return (
    <div className="sign-up">
      <div className="sign-up-content">
        <h2>Register Your Account</h2>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            try {
              console.log(userName, email, password);
              const response = await register({
                variables: {
                  email,
                  password,
                },
              });
              console.log(response);
              history.push("/user/SignIn");
            } catch (error) {
              console.log(error);
            }
          }}
        >
          {error && <div className="error">{error.message}</div>}
          <input
            type="text"
            placeholder="UserName"
            required={true}
            onChange={(e) => {
              setUserName(e.target.value);
            }}
          />
          <input
            type="email"
            placeholder="Email"
            required={true}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <input
            type="password"
            placeholder="Password"
            required={true}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <button type="submit" className="auth-btn">
            Continue
          </button>
        </form>
        <button className="google-btn">Continue with Google</button>
        <p>
          Already have an account?
          <em
            onClick={() => {
              history.push("/user/SignIn");
            }}
          >
            SIGN IN
          </em>
        </p>
      </div>
    </div>
  );
}
