export interface User {
  firstName: string;
  lastName: string;
}

export interface AppContext {
  user?: User;
  updateUser?: (user: User) => void;
}
