import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js"
import userRoutes from "./routes/userRoutes.js"
import taskRoutes from "./routes/taskRoutes.js"
import reportRoutes from "./routes/reportRoutes.js"
const app = express();

dotenv.config();
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);
app.use(express.json())
//Routes
app.use("/api/v1/auth",authRoutes)
app.use("/api/v1/task",taskRoutes)
app.use("/api/v1/user",userRoutes)
app.use("/api/v1/report",reportRoutes)

export default app;
