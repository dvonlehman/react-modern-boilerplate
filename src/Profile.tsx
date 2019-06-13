import React, { FC, useState, FormEvent, ChangeEvent } from "react";
import { useContext } from "./context";
import { RouteComponentProps } from "@reach/router";
import { updateUser } from "./api";

const Profile: FC<RouteComponentProps> = () => {
  // Use the useContext hook to get access to the state in the top-level AppContext
  const context = useContext();

  const [state, setState] = useState({
    user: context.user,
    isUpdating: false,
    didUpdate: false
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setState({ ...state, isUpdating: true, didUpdate: false });

    const updatedUser = await updateUser(state.user);

    // Update the user in the global AppContext. This will cause the change to be reflected
    // everywhere the context user is displayed such as in the Header.
    context.updateUser(updatedUser);

    setState({ ...state, isUpdating: false, didUpdate: true });
  };

  const onFirstNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      didUpdate: false,
      user: { ...state.user, firstName: e.currentTarget.value }
    });
  };

  const onLastNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      didUpdate: false,
      user: { ...state.user, lastName: e.currentTarget.value }
    });
  };

  // Disable the submit button if the user is in the process of being updated or
  // the first and last name have not been modified.
  const disableSubmit =
    state.isUpdating ||
    (state.user.firstName === context.user.firstName &&
      state.user.lastName === context.user.lastName);

  return (
    <div>
      <h2>Edit Profile</h2>
      <form onSubmit={handleSubmit} style={{ width: 400 }}>
        <div className="field">
          <label>First Name</label>
          <input
            className="input"
            type="text"
            required={true}
            disabled={state.isUpdating}
            defaultValue={context.user.firstName}
            onChange={onFirstNameChange}
          />
        </div>
        <div className="field">
          <label>Last Name</label>
          <input
            className="input"
            type="text"
            required={true}
            disabled={state.isUpdating}
            defaultValue={context.user.lastName}
            onChange={onLastNameChange}
          />
        </div>
        <button className="button" type="submit" disabled={disableSubmit}>
          Update
        </button>
        {state.didUpdate && <span>Profile has been updated</span>}
      </form>
    </div>
  );
};

export default Profile;
