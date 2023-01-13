import { User } from "./User";
import { useState } from "react";
import { Link } from "react-router-dom";

export const Header = ({loggedIn, setLoggedIn}) => {

  return (
    <div className="header-bar">
      <Link to={'/'}> <h1>BNN - Beehive News Network</h1></Link>
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
