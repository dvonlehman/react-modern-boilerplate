import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom";
import FullScreenLoader from "./components/FullScreenLoader";
import { User } from "./types";

let _user: User | undefined;

// Simulate a delay while fetching the user. The Suspense loading fallback
// will be display both while loading the bundle and fetching the user, or any
// other mandatory data required before displaying any portion of the app.
// We don't have to worry about a loading indicator glitch where one loader appears
// while downloading the bundle, then another loader appears while fetching the
// initial app data.
let AppContextProvider = lazy(async () => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  _user = { firstName: "Kawhi", lastName: "Leonard" };
  return import("./context");
});

// Lazy import the App.
let App = lazy(() => import("./App"));

const rootElement = document.getElementById("root");
ReactDOM.render(
  <Suspense fallback={<FullScreenLoader />}>
    <AppContextProvider getUser={() => _user}>
      <App />
    </AppContextProvider>
  </Suspense>,
  rootElement
);
