import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useUser } from "../context/userContext";

export default function Sidebar() {
  const { currentUser, setCurrentUser } = useUser();
  const navigate = useNavigate();
  const handlelogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setCurrentUser(null);
    navigate("/");
    toast.success("Logout successfully...");
  };

  return (
    <ul className="space-y-8 p-8">
      <li className="bg-gray-600 hover:bg-gray-800 p-2 rounded shadow-lg">
        <Link to="/">Home</Link>
      </li>
      <li className="bg-gray-600 hover:bg-gray-800 p-2 rounded shadow-lg">
        <Link to="/dashboard">Dashboard</Link>
      </li>
      <li className="bg-gray-600 hover:bg-gray-800 p-2 rounded shadow-lg">
        <Link to="/dashboard/transfer">Transfer</Link>
      </li>
      <li className="bg-gray-600 hover:bg-gray-800 p-2 rounded shadow-lg">
        <Link to="/dashboard/transactions">History</Link>
      </li>
      {(currentUser) ? (
        <li className="bg-gray-600 hover:bg-gray-800 p-2 rounded shadow-lg">
          <button className="hover:cursor-pointer" onClick={handlelogout}>
            Logout
          </button>
        </li>
      ) : (
        <li className="bg-gray-600 hover:bg-gray-800 p-2 rounded shadow-lg">
          <Link to="/login">Login</Link>
        </li>
      )}
    </ul>
  );
}
