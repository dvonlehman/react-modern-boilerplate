import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom";
import FullScreenLoader from "./components/FullScreenLoader";
import { User } from "./types";

let _user: User;

// Simulate a delay while fetching the user. The Suspense loading fallback
// will be display for as long as it takes to both load the bundle chunk and fetch the
// current user (and any other remote data needed to initially bootstrap the app).
// We don't have to worry about a loading indicator glitch where one loader appears
// while downloading the bundle, then another loader appears while fetching the
// initial app data. Just one continuous loading indicator until the app has everything
// it needs to render the initial view.
let AppContextProvider = lazy(async () => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  _user = { firstName: "Sally", lastName: "Smith" };
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
