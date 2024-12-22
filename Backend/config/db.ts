import mongoose from "mongoose";
require("dotenv").config();
const dbUser = process.env.DB_USER;
const dbPass = process.env.DB_PASSWORD;

async function connect() {
  try {
    await mongoose.connect(
      `mongodb+srv://${dbUser}:${dbPass}@e-comerce.jf17g.mongodb.net/?retryWrites=true&w=majority&appName=E-comerce`
    );
  } catch (error) {
    console.log(error);
  }
}

export default connect;