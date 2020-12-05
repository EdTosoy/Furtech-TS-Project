import React, { ReactElement, useState } from "react";
import { useHistory } from "react-router-dom";

import { useLoginMutation } from "../../generated/graphql";
import { setAccessToken } from "../../accessToken";
export default function SignIn(): ReactElement {
  let history = useHistory();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [login, { error }] = useLoginMutation();

  return (
    <div className="sign-in">
      <div className="sign-in-content">
        <h2>Login Your Account</h2>
        <form
          onSubmit={async (e) => {
            try {
              e.preventDefault();
              console.log(userName, password);
              const response = await login({
                variables: {
                  email: userName,
                  password,
                },
              });
              console.log(response);
              if (response && response.data) {
                setAccessToken(response.data!.login.accessToken);
              }
              history.push("/");
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
          have no account?
          <em
            onClick={() => {
              history.push("/auth/SignUp");
            }}
          >
            SIGN UP
          </em>
        </p>
      </div>
    </div>
  );
}
