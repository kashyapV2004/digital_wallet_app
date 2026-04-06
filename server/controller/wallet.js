import db from "../config/db.js";

export const getBalance = async (req, res) => {
  const user_id = req.userId;
  try {
    const [wallet] = await db.query(
      "select balance from wallets where user_id = ?",
      [user_id],
    );
    res.json({ balance: wallet[0].balance });
  } catch (err) {
    console.log(err.message);
  }
};

export const addMoney = async (req, res) => {
  const user_id = req.userId;
  try {
    const { amount } = req.body;
    if (amount === 0) return res.json({ message: "Add more than 0" });
    await db.query(
      "UPDATE wallets set balance = balance + ? where user_id = ?",
      [amount, user_id],
    );
    res.json({ message: "amount added successfully" });
  } catch (err) {
    res.json({ err: err.message });
  }
};

export const transferMoney = async (req, res) => {
  const { receiver_id, amount } = req.body;
  const user_id = req.userId;

  try {
    const connection = await db.getConnection();
    await connection.beginTransaction();
    // Check sender balance
    const [sender] = await connection.query(
      "SELECT balance FROM wallets WHERE user_id = ?",
      [user_id],
    );
    if (sender[0].balance < amount) throw new Error("Insufficient balance");

    // Deduct sender
    await connection.query(
      "UPDATE wallets SET balance = balance - ? WHERE user_id = ?",
      [amount, user_id],
    );

    // Add receiver
    await connection.query(
      "UPDATE wallets SET balance = balance + ? WHERE user_id = ?",
      [amount, receiver_id],
    );

    // Record transaction
    await connection.query(
      "INSERT INTO transactions (sender_id, receiver_id, amount) VALUES (?, ?, ?)",
      [user_id, receiver_id, amount],
    );
    await connection.commit();
    res.json({ message: "Transfer successful" });
  } catch (err) {
    await connection.rollback();
    res.status(400).json({ error: err.message });
  } finally {
    await connection.release();
  }
};

export const transactions = async (req, res) => {
  try {
    const user_id = req.userId;
    const [rows] = await db.query(
      "select * from transactions where sender_id = ? or receiver_id = ? order by created_at DESC",
      [user_id, user_id],
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
