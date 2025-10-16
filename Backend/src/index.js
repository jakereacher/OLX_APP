import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser"
import authRoutes from "./routes/auth.route.js";
import productRoutes from "./routes/product.route.js"
import { connectDB } from "./lib/db.js";
import cors from "cors"


const app = express()


dotenv.config()

const port = process.env.PORT


app.use(express.json({ limit: '10mb' }));
app.use(cookieParser())

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

app.use("/api/auth", authRoutes);
app.use("/api/product",productRoutes);


app.listen(port, () => {
    console.log("app is running")
    connectDB()
})