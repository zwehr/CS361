import "../styles/Account.css";
import { UserAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Account() {
  const { user, logout } = UserAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
      console.log("Logout successful.");
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <div className="Account">
      <h2>Account</h2>
      <p>User email: {user && user.email}</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
