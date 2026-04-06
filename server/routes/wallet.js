import express from "express";
import { addMoney, getBalance, transactions, transferMoney } from "../controller/wallet.js";
import verifyToken from "../middleware/auth.js";
const router = express.Router();

router.get("/balance", verifyToken, getBalance);
router.post("/add", verifyToken, addMoney);
router.post("/transfer", verifyToken, transferMoney);
router.get("/transactions", verifyToken, transactions);

export default router;