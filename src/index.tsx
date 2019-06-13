import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom";
import { Router } from "@reach/router";
import Header from "./components/Header";
import { AppContextProvider } from "./context";
import "./index.css";
import { User } from "./types";

let _user: User | undefined = undefined;

// Lazy load the page specific bundle as needed
let Home = lazy(async () => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  _user = { firstName: "Kawhi", lastName: "Leonard" };
  return import("./Home");
});

let Nested = lazy(() => import("./Nested"));

const rootElement = document.getElementById("root");
ReactDOM.render(
  <AppContextProvider user={_user}>
    <div>
      <Header />
      <section className="main">
        <Suspense fallback={<div>Loading...</div>}>
          <Router>
            <Home path="/" />
            <Nested path="/nested" />
          </Router>
        </Suspense>
      </section>
    </div>
  </AppContextProvider>,
  rootElement
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
