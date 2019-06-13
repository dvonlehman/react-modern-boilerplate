import React, { lazy } from "react";
import { Router } from "@reach/router";
import Header from "./components/Header";

import "./App.css";

// Lazy load the page specific bundles as needed
let Home = lazy(async () => import("./Home"));
let Nested = lazy(() => import("./Nested"));

export default function() {
  return (
    <div>
      <Header />
      <section className="main">
        <Router>
          <Home path="/" />
          <Nested path="/nested" />
        </Router>
      </section>
    </div>
  );
}
