import React, { FC } from "react";
import { User, AppContext } from "./types";

const Context = React.createContext<AppContext>({});

export function useContext(): AppContext {
  return React.useContext<AppContext>(Context);
}

interface AppContextProviderProps {
  // When using a simple user prop, the value was always undefined. Must be something
  // related to the lazy importing. Using a function does the trick.
  getUser: () => User | undefined,
}

const AppContextProvider: FC<AppContextProviderProps> = props => {
  const [state, setState] = React.useState({ user: props.getUser() });

  const updateUser = (user: User) => setState({ ...state, user });

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

// Because we are lazy importing, the AppContextProvider must be the default export.
export default AppContextProvider;
