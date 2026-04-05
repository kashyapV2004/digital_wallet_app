import db from "../config/db.js";

export const getBalance = async (req, res) => {
  try {
    const [wallet] = await db.query(
      "select balance from wallets where user_id = ?",
      [req.userId],
    );
    res.json({ balance: wallet[0].balance });
  } catch (err) {
    console.log(err.message);
  }
};

export const addMoney = async (req, res) => {
    try {
        const {amount} = req.body;
        if(amount === 0) return res.json({message : "Add more than 0"});
        await db.query("UPDATE wallets set balance = balance + ? where user_id = ?",[amount, req.userId]);
        res.json({message : "amount added successfully"});

    }catch(err) {
        res.json({err : err.message});
    }
};

export const transferMoney = async (req, res) => {
    
};

export const transactions = async (req, res) => {};
