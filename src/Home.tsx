import React, { FunctionComponent } from "react";
import { RouteComponentProps, Link } from "@reach/router";

const Home: FunctionComponent<RouteComponentProps> = props => (
  <div>
    <h2>Home Page</h2>
    <Link to="/nested">Navigate to nested</Link>
  </div>
);

export default Home;
