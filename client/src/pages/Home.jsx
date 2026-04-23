import { useNavigate } from "react-router-dom";

export default function Home() {
    const navigate = useNavigate();
    const login = ()=> {
        navigate("/login");
    }

    const register = () => {
        navigate("/register");
    }
  return (
    <div className="min-h-screen bg-gray-300 flex flex-col items-center justify-center text-center px-6">
      <h1 className="text-4xl font-bold mb-4">
        💰 Welcome to Wallet Manager
      </h1>
      <p className="text-gray-600 mb-6">
        Manage your income, track expenses, and stay in control of your money —
        all in one simple place.
      </p>
      <div className="space-x-4">
        <button className="bg-gray-900 text-white px-6 py-2 rounded-xl hover:opacity-90" onClick={register}>
          Register
        </button>
        <button className="border border-gray-400 text-gray-800 px-6 py-2 rounded-xl hover:bg-gray-800 hover:text-white" onClick={login}>Login</button>
      </div>
    </div>
  );
}
