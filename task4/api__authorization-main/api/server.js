import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import Fingerprint from "express-fingerprint";
import AuthRootRouter from "./routers/Auth.js";
import TokenService from "./services/Token.js";
import cookieParser from "cookie-parser";
import pool from './db.js';

dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(cors({ credentials: true, origin: process.env.CLIENT_URL }));
app.use(
  Fingerprint({
    parameters: [Fingerprint.useragent, Fingerprint.acceptHeaders],
  })
);

app.use("/auth", AuthRootRouter);

app.get("/resource/table", TokenService.checkAccess, async (_, res) => {
  try {
    const users = await pool.query("SELECT * FROM users");
    res.status(200).json(users.rows); 
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Ошибка при получении пользователей' });
  }
});

app.listen(PORT,'0.0.0.0', () => {
  console.log("Сервер успешно запущен");
});
