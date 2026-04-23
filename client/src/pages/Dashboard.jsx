import { useEffect, useState } from "react";
import API from "../api";
import { toast } from "react-toastify";

export default function Dashboard() {
  const [balance, setBalance] = useState(null);
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState("");


  // Fetch Balance
  const fetchBalance = async () => {
    try {
      setLoading(true);
      const res = await API.get("/dashboard/balance");
      setBalance(res.data.balance);
    } catch (err) {
      console.log(err);
      toast.error("Failed to fetch balance");
    } finally {
      setLoading(false);
    }
  };

  // Add Balance
  const handleAddBalance = async () => {
    if (!amount || amount <= 0) {
      toast.error("Enter valid amount");
      return;
    }

    try {
      await API.post("/dashboard/add", { amount });
      toast.success("Balance added 💰");

      setAmount("");

      // 🔥 Auto update balance without reload
      fetchBalance();
    } catch (err) {
      toast.error(err.response?.data?.error || "Failed to add balance");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-6">Welcome 👋</h1>
      <div className="flex gap-4 mb-6">
        <button
          onClick={fetchBalance}
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
        >
          Check Balance 💰
        </button>
        <div className="flex gap-2">
          <input
            type="number"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="border px-3 py-2 rounded"
          />
          <button
            onClick={handleAddBalance}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Add
          </button>
        </div>
      </div>

      {/* Balance Card */}
      <div className="bg-white p-6 rounded-2xl shadow-md w-full max-w-md">
        <h2 className="text-lg font-semibold mb-4">Your Balance</h2>

        {loading ? (
          <p>Loading...</p>
        ) : balance !== null ? (
          <h3 className="text-3xl font-bold text-green-600">₹ {balance}</h3>
        ) : (
          <p className="text-gray-500">Click "Check Balance" to view</p>
        )}
      </div>
    </div>
  );
}
