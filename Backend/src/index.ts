import express from "express";
import router from "./routes/Router";
import db from "./config/db";

const app = express();

app.use(express.json());

app.use("/", router);

app.listen(5000, async () => {
  try {
    const checkConnection = await db();
    if(checkConnection) {
      console.log("App rodando !");
    } else {
      throw Error;
    }
  } catch (error) {
    console.log(error);
  }
  
});
