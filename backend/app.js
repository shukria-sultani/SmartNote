import express from "express"
import authRoutes from "./routes/authRoutes.js";
import notesRoutes from "./routes/notesRoutes.js"
const app = express();
app.use(express.json())
app.use("/api/auth", authRoutes);
app.use("/api/note", notesRoutes);



export default app;