import { User } from "./User";
import { useState } from "react";

export const Header = ({loggedIn, setLoggedIn}) => {

  return (
    <div className="header-bar">
      <h1>BNN - Beehive News Network</h1>
      {loggedIn === false ? (
        <button className="log-in"
          onClick={() => {
            setLoggedIn(true);
          }}
        >
          Log In
        </button>
      ) : (
        <p className="user-handle">tickle122</p>
      )}
    </div>
  );
};
