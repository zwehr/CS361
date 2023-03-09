import "../styles/Login.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { signIn } = UserAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signIn(email, password);
      navigate("/account");
    } catch (e) {
      setError(e.message);
      console.log(e.message);
    }
  };

  return (
    <div className="Login">
      <h2 className="h2-header">Login</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">
          <input
            type="email"
            name="email"
            value={email}
            id="email"
            onChange={(e) => setEmail(e.target.value)}
          ></input>
        </label>
        <label htmlFor="password">
          <input
            type="password"
            name="password"
            value={password}
            id="password"
            onChange={(e) => setPassword(e.target.value)}
          ></input>
        </label>
        <input type="submit" value="Log In"></input>
      </form>
    </div>
  );
}
