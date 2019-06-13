import React, { lazy } from "react";
import { Router } from "@reach/router";
import Header from "./components/Header";

import "./App.css";

// Lazy load the page specific bundles as needed
let Home = lazy(() => import("./Home"));
let Nested = lazy(() => import("./Nested"));
let Profile = lazy(() => import("./Profile"));

export default function() {
  return (
    <div>
      <Header />
      <section className="main">
        <Router>
          <Home path="/" />
          <Nested path="/nested" />
          <Profile path="/profile" />
        </Router>
      </section>
    </div>
  );
}
