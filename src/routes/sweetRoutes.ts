import express from "express";
import {
  createSweet,
  getSweets,
  updateSweet,
  deleteSweet,
  purchaseSweet,
  restockSweet,checkStock
} from "../controllers/sweetController";
import {  authMiddleware } from "../middleware/authMiddleware";
import { isAdmin } from "../middleware/isAdminMiddleware";

const router = express.Router();

// Public
router.get("/", getSweets);

// Admin-only
router.post("/",  authMiddleware, isAdmin, createSweet);
router.put("/:id",  authMiddleware, isAdmin, updateSweet);
router.delete("/:id",  authMiddleware, isAdmin, deleteSweet);
// Purchase (authenticated users)
router.post("/:id/purchase", authMiddleware, purchaseSweet);
// Restock (admin only)
router.post("/:id/restock", authMiddleware, isAdmin, restockSweet);
router.get("/:id/stock", checkStock);

export default router;
