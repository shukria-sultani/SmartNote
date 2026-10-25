import express from "express"
import authRoutes from "./routes/authRoutes.js";
import notesRoutes from "./routes/notesRoutes.js"
import cors from "cors"
import dotenv from "dotenv"
dotenv.config();
const app = express();
app.use(express.json())
app.use(cors({origin: process.env.FRONTEND_URL}))
app.use("/api/auth", authRoutes);
app.use("/api/note", notesRoutes);



export default app;