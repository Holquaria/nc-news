import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/User";

export const Header = () => {
  const {user, setUser} = useContext(UserContext)

  return (
    <div className="header-bar">
      <Link to={'/'}> <h1>BNN - Beehive News Network</h1></Link>
      {user === null ? (
        <button className="log-in"
          onClick={() => {
            setUser('tickle122');
          }}
        >
          Log In
        </button>
      ) : (
        <p className="user-handle">{user}</p>
      )}
    </div>
  );
};
