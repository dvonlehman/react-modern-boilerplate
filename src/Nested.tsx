import React, { FunctionComponent } from "react";
import { RouteComponentProps, Link } from "@reach/router";

const Dashboard: FunctionComponent<RouteComponentProps> = props => (
  <div>
    <h2>Nested Page</h2>
    <Link to="/">Back to Home</Link>
  </div>
);

export default Dashboard;
