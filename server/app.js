import express from "express";
import userRouter from "./routes/user.js";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middlewares/error.js";
// import connectDB from "./data/database.js";
import { config } from "dotenv";
import postRouter from "./routes/post.js";
const connectDB = () => {
    mongoose
      .connect(process.env.MONGO_URL)
      .then((c) => console.log(`Database Connected with ${c.connection.host}`))
      .catch((e) => console.log(e));
  };
config({
    path: "./data/config.env",
  });
const app=express();
app.use(express.json());
connectDB();
app.use(
    cors({
      origin: [process.env.FRONTEND_URL],
      methods: ["GET", "POST", "PUT", "DELETE"],
      credentials: true,
    })
  );


app.use(cookieParser());
app.use("/api/v1/users", userRouter);
app.use("/api/v1/post", postRouter);

app.get("/", (req, res) => {
    res.send("Nice working");
  });
  
  // Using Error Middleware
  app.use(errorMiddleware);

app.listen(process.env.PORT,()=>{
    console.log(`server connected on ${process.env.PORT}`);
});