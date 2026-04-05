import mysql from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

// const createDatabase = `create database if not exists ${process.env.DB_NAME}`;
// const show = "show tables";

// const userTable = `CREATE TABLE IF NOT EXISTS users (
//   id INT PRIMARY KEY AUTO_INCREMENT,
//   name VARCHAR(100) NOT NULL,
//   email VARCHAR(100) UNIQUE NOT NULL,
//   password VARCHAR(255) NOT NULL,
//   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
// );`;

// const walletTable = `CREATE TABLE IF NOT EXISTS wallets (
//   id INT PRIMARY KEY AUTO_INCREMENT,
//   user_id INT,
//   balance DECIMAL(10,2) DEFAULT 0,
//   FOREIGN KEY (user_id) REFERENCES users(id)
// );`;

// const transactionTable = `CREATE TABLE IF NOT EXISTS transactions (
//   id INT PRIMARY KEY AUTO_INCREMENT,
//   sender_id INT,
//   receiver_id INT,
//   amount DECIMAL(10,2),
//   status VARCHAR(20) DEFAULT 'SUCCESS',
//   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//   FOREIGN KEY (sender_id) REFERENCES users(id),
//   FOREIGN KEY (receiver_id) REFERENCES users(id)
// );`;

const createDB = async () => {
  try {
    // await db.execute(createDatabase);
    // console.log("database created successfully...");

    // await db.execute(userTable);
    // await db.execute(walletTable);
    // await db.execute(transactionTable);

    // const allTables = await db.execute(show);
    // console.log(allTables);
  } catch (err) {
    console.log(err.message);
  }
};

// createDB();

export default db;
