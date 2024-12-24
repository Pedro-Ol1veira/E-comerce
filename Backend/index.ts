import express from "express";
import { Request, Response } from "express";
import router from "./routes/Router";
import db from "./config/db";

const app = express();

app.use(express.json());

app.use("/", router);

app.listen(5000, async () => {
  try {
    await db();
    console.log("App rodando e conectado ao db!");
  } catch (error) {
    console.log(error);
  }
  
});
