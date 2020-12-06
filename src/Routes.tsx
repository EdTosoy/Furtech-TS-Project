import React, { ReactElement } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import Home from "./Pages/Home/Home";
import "./App.css";
import About from "./Pages/About/About";
import { MenuProvider } from "./ContextApi/menuContext";
import { ApolloProvider } from "@apollo/client";
import { client } from "./index";
import AuthSignIn from "./Pages/Auth/AuthSignIn";
import AuthSignUp from "./Pages/Auth/AuthSignUp";
import Shopping from "./Pages/Shopping/Shopping";

function Routes(): ReactElement {
  return (
    <ApolloProvider client={client}>
      <MenuProvider>
        <div className="app">
          <Router>
            <Header />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/shopping/:category" component={Shopping} />
              <Route exact path="/auth/SignIn" component={AuthSignIn} />
              <Route exact path="/auth/SignUp" component={AuthSignUp} />
              <Route exact path="/about" component={About} />
            </Switch>
            <Footer />
          </Router>
        </div>
      </MenuProvider>
    </ApolloProvider>
  );
}

export default Routes;
