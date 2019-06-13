import React, { FC } from "react";
import { User, AppContext } from "./types";

// In order to make TS happy, we need to pass in a defaultValue.
const Context = React.createContext<AppContext>({
  user: { firstName: "", lastName: "" },
  updateUser: (user: User) => {}
});

// Custom hook that components can use to access the AppContext
export function useContext(): AppContext {
  return React.useContext<AppContext>(Context);
}

interface AppContextProviderProps {
  // When using a simple user prop, the value was always undefined. Must be something
  // related to the lazy importing. Using a function does the trick.
  getUser: () => User;
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
