import React, { FC } from "react";
import { User, AppContext } from "./types";

// function useContext() {
//   const context = React.useContext<AppContext>(Context);

//   const [state, setState] = context;
//   // if (!context) {
//   //   throw new Error("useAppContext must be used within a AppContext");
//   // }

//   return {
//     user,
//     setUser
//   };
// }

const Context = React.createContext<AppContext>({});

const AppContextProvider: FC<{ user: User | undefined }> = props => {
  const [state, setState] = React.useState({ user: props.user });

  const updateUser = (user: User) => setState({ ...state, user });

  // const Context = React.createContext<AppContext>({
  //   user: props.user,
  //   updateUser
  // });

  return (
    <Context.Provider
      value={{
        ...state,
        updateUser
      }}
    >
      {props.children}
    </Context.Provider>
  );
};

export { Context, AppContextProvider };
