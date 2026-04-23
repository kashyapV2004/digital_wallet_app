import { useEffect, useState } from "react";
import API from "../api";

export default function Transactions() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await API.get("/dashboard/transactions");
        setTransactions(res.data.data || res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchTransactions();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h2 className="text-2xl font-bold mb-4">Transaction History 📜</h2>

      <div className="bg-white rounded-2xl shadow overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-3">Type</th>
              <th className="p-3">Amount</th>
              <th className="p-3">Date</th>
            </tr>
          </thead>

          <tbody>
            {transactions.map((t, index) => (
              <tr key={index} className="border-t">
                <td className="p-3">
                  {t.type === "DEBIT" ? (
                    <span className="text-red-500">Debit</span>
                  ) : (
                    <span className="text-green-500">Credit</span>
                  )}
                </td>
                <td className="p-3">₹ {t.amount}</td>
                <td className="p-3">
                  {new Date(t.created_at).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
