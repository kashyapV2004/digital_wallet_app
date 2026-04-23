import { useState } from "react";
import API from "../api";

export default function Balance() {
  const [balance, setBalance] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchBalance = async () => {
    try {
      setLoading(true);
      const res = await API.get("/dashboard/balance");
      setBalance(res.data.balance);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md w-full max-w-md">
      <h2 className="text-lg font-semibold mb-4">Your Balance</h2>

      {balance === null ? (
        <button
          onClick={fetchBalance}
          className="bg-indigo-500 text-white px-4 py-2 rounded"
        >
          Load Balance
        </button>
      ) : loading ? (
        <p>Loading...</p>
      ) : (
        <h3 className="text-2xl font-bold text-green-600">₹ {balance}</h3>
      )}
    </div>
  );
}
