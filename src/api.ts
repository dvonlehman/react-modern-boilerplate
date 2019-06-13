import { User } from "./types";

export async function fetchUser(): Promise<User> {
  await new Promise(resolve => setTimeout(resolve, 1000));
  return { firstName: "Sally", lastName: "Smith" };
}

export async function updateUser(user: User): Promise<User> {
  await new Promise(resolve => setTimeout(resolve, 1000));
  return user;
}
