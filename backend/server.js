import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cors from "cors";
import path from "path";
import authRoutes from "./routes/authRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import { notFound, errorHandler } from "./middlewares/errorMiddleware.js";

dotenv.config();
connectDB();

const app = express();
const __dirname = path.resolve();

// app.use(cors());
app.use(cors({
    origin: "http://localhost:5173", // your Vite frontend URL
    credentials: true,
  }));
app.use(express.json()); // Body parser
app.use("/uploads", express.static(path.join(__dirname, "/uploads"))); // Serve uploaded files

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

// Error Handling
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
