import { useState } from "react";
import API from "../api";
import { toast } from "react-toastify";

export default function Transfer() {
  const [form, setForm] = useState({
    receiver_id: "",
    amount: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/dashboard/transfer", form);
      toast.success("Money sent successfully 💸");
    } catch (err) {
      toast.error(err.response?.data?.error || "Transfer failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md space-y-4"
      >
        <h2 className="text-xl font-bold text-center">Send Money</h2>

        <input
          type="text"
          name="receiver_id"
          placeholder="Receiver ID"
          className="w-full border px-4 py-2 rounded"
          onChange={handleChange}
        />

        <input
          type="number"
          name="amount"
          placeholder="Amount"
          className="w-full border px-4 py-2 rounded"
          onChange={handleChange}
        />

        <button className="w-full bg-indigo-600 text-white py-2 rounded">
          Transfer
        </button>
      </form>
    </div>
  );
}
