import db from "../config/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const loginController = async (req, res) => {
  const { email, password } = req.body;
  try {
    const [row] = await db.query("select * from users where email = ?", [
      email,
    ]);
    if (!row.length) res.status(404).json({ message: "user not found" });
    const user = row[0];
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: "Invalid Password" });
    const token = jwt.sign({ id: user.id }, process.env.SECRET, {
      expiresIn: "2d",
    });
    res.json({
      token,
      user: { id: user.id, username: user.name, email: user.email },
    });
  } catch (err) {}
};

export const registerController = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const [user] = await db.query(
      "insert into users (name, email, password) values(?, ?, ?)",
      [name, email, hashedPassword],
    );

    await db.query("insert into wallets (user_id, balance) values(?, 0)", [
      user.insertId,
    ]);

    res.json({
      message: "User Registered Successfully...",
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
