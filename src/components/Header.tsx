import React, { FC } from "react";
import { useContext } from "../context";
import { Link } from "@reach/router";

const Header: FC = () => {
  // Use the useContext hook to get access to the state in the top-level AppContext
  const context = useContext();

  return (
    <header>
      <Link className="title" to="/">
        Site Title
      </Link>
      {context.user && (
        <Link to="/profile" className="user">
          {context.user.firstName} {context.user.lastName}
        </Link>
      )}
    </header>
  );
};

export default Header;
