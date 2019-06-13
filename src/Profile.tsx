import React, { FC, useState, FormEvent, ChangeEvent } from "react";
import { useContext } from "./context";
import { RouteComponentProps } from "@reach/router";

const Profile: FC<RouteComponentProps> = () => {
  // Use the useContext hook to get access to the state in the top-level AppContext
  const context = useContext();

  const [user, setUser] = useState(context.user);
  const [formState, setFormState] = useState({
    isUpdating: false,
    didUpdate: false
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormState({ isUpdating: true, didUpdate: false });

    // Simulate making an API call to update the user profile.
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Update the user in the global AppContext. This will cause the change to be reflected
    // everywhere the context user is displayed such as in the Header.
    context.updateUser(user);
    setFormState({ isUpdating: false, didUpdate: true });
  };

  const onFirstNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormState({ ...formState, didUpdate: false });
    setUser({ ...user, firstName: e.currentTarget.value });
  };

  const onLastNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormState({ ...formState, didUpdate: false });
    setUser({ ...user, lastName: e.currentTarget.value });
  };

  // Disable the submit button if the user is in the process of being updated or
  // the first and last name have not been modified.
  const disableSubmit =
    formState.isUpdating ||
    (user.firstName === context.user.firstName &&
      user.lastName === context.user.lastName);

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
            disabled={formState.isUpdating}
            defaultValue={user.firstName}
            onChange={onFirstNameChange}
          />
        </div>
        <div className="field">
          <label>Last Name</label>
          <input
            className="input"
            type="text"
            required={true}
            disabled={formState.isUpdating}
            defaultValue={user.lastName}
            onChange={onLastNameChange}
          />
        </div>
        <button className="button" type="submit" disabled={disableSubmit}>
          Update
        </button>
        {formState.didUpdate && <span>Profile has been updated</span>}
      </form>
    </div>
  );
};

export default Profile;
