import dotenv from "dotenv";
import express from "express";
import userRoutes from "./routes/users.js";
import walletRoutes from "./routes/wallet.js";
import cors from "cors";

dotenv.config();

const PORT = process.env.PORT;
const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true
  })
);

app.use(express.json());

app.use("/dashboard", walletRoutes);
app.use("/", userRoutes);

app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});
