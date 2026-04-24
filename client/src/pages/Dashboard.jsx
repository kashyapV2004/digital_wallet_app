import { useEffect, useState } from "react";
import API from "../api";
import { toast } from "react-toastify";

export default function Dashboard() {
  const [balance, setBalance] = useState(null);
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    setUser(userData);
  }, []);

  const fetchBalance = async () => {
    try {
      setLoading(true);
      const res = await API.get("/dashboard/balance");
      setBalance(res.data.balance);
    } catch (err) {
      toast.error("Failed to fetch balance, Please login agian");
    } finally {
      setLoading(false);
    }
  };

  const handleAddBalance = async () => {
    if (!amount || amount <= 0) {
      toast.error("Enter valid amount");
      return;
    }

    try {
      await API.post("/dashboard/add", { amount });
      toast.success("Balance added 💰");
      setAmount("");
      fetchBalance();
    } catch (err) {
      toast.error(err.response?.data?.error || "Failed to add balance");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-gray-100 p-6">
      {/* Header */}
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Welcome 👋</h1>

      {/* Top Section */}
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        {/* User Card */}
        {user && (
          <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">
              👤 Profile
            </h2>

            <p className="text-gray-500 text-sm">Account Holder</p>
            <p className="text-xl font-bold text-gray-800 mb-3">
              {user.username}
            </p>

            <p className="text-gray-500 text-sm">Email</p>
            <p className="text-gray-700">{user.email}</p>
          </div>
        )}

        {/* Balance Card */}
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-2xl shadow-lg p-6 flex flex-col justify-between">
          <h2 className="text-lg font-semibold mb-2">💰 Wallet Balance</h2>

          {loading ? (
            <p>Loading...</p>
          ) : balance !== null ? (
            <h3 className="text-4xl font-bold">
              ₹ {balance?.toLocaleString()}
            </h3>
          ) : (
            <p className="text-sm opacity-80">Click below to view balance</p>
          )}

          <button
            onClick={fetchBalance}
            className="mt-4 bg-white text-green-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition"
          >
            Check Balance
          </button>
        </div>
      </div>

      {/* Add Balance Section */}
      <div className="bg-white rounded-2xl shadow-lg p-6 max-w-md">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">
          ➕ Add Balance
        </h2>

        <div className="flex gap-3">
          <input
            type="number"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="flex-1 border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />

          <button
            onClick={handleAddBalance}
            className="bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700 transition"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
