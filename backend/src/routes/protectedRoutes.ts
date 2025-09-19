import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();


router.get("/profile", authMiddleware, (req, res) => {
  res.json({ message: "Welcome to your profile!", user: (req as any).user });
});

export default router;
