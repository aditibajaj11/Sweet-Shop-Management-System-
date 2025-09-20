import express, { Application, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db";
import authRoutes from "./routes/authRoutes";
import protectedRoutes from "./routes/protectedRoutes";
import sweetRoutes from "./routes/sweetRoutes";


dotenv.config();

export const app: Application = express();

app.use(cors({
  origin: 'https://sweet-shop-management-system-two.vercel.app'

}));
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/protected", protectedRoutes);
app.use("/api/sweets", sweetRoutes);



app.get("/", (req: Request, res: Response) => {
  res.send("Sweet Shop API is running");
});

if (process.env.NODE_ENV !== "test") {
  const PORT = process.env.PORT || 5000;

  connectDB().then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  });
}

export default app;
