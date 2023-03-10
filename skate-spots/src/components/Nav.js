import { NavLink } from "react-router-dom";
import "../styles/Nav.css";
import { UserAuth } from "../context/AuthContext";

export default function Nav() {
  const { user } = UserAuth();

  return (
    <nav className="Nav">
      <h1 className="app-name">Skate Spots App</h1>
      <NavLink to="/">Home (Map)</NavLink>
      {user && <NavLink to="/spots-list">Spots List (Admin)</NavLink>}
      {user && <NavLink to="/add-spot">Add Spot</NavLink>}
      {user && <NavLink to="/account">Account</NavLink>}
      <NavLink to="/login">Admin Login</NavLink>
    </nav>
  );
}
