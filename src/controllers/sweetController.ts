import { Request, Response } from "express";
import Sweet from "../models/Sweet";

// Create Sweet (admin only)
export const createSweet = async (req: Request, res: Response) => {
  try {
    const { name, price, description, category, quantity } = req.body;

    const sweet = new Sweet({ name, price, description, category, quantity });
    await sweet.save();

    res.status(201).json(sweet);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Get all sweets (public)
export const getSweets = async (req: Request, res: Response) => {
  try {
    const sweets = await Sweet.find();
    res.json(sweets);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Update Sweet (admin only)
export const updateSweet = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, price, description, category, quantity } = req.body;

    const sweet = await Sweet.findByIdAndUpdate(
      id,
      { name, price, description, category, quantity },
      { new: true }
    );

    if (!sweet) {
      return res.status(404).json({ message: "Sweet not found" });
    }

    res.json(sweet);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Delete Sweet (admin only)
export const deleteSweet = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const sweet = await Sweet.findByIdAndDelete(id);

    if (!sweet) {
      return res.status(404).json({ message: "Sweet not found" });
    }

    res.json({ message: "Sweet deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Purchase Sweet (reduce quantity) - authenticated users
export const purchaseSweet = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;

    const sweet = await Sweet.findById(id);
    if (!sweet) return res.status(404).json({ message: "Sweet not found" });

    if (sweet.quantity < quantity) {
      return res.status(400).json({ message: "Not enough stock available" });
    }

    sweet.quantity -= quantity;
    await sweet.save();

    res.json(sweet);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Restock Sweet (admin only)
export const restockSweet = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;

    const sweet = await Sweet.findById(id);
    if (!sweet) return res.status(404).json({ message: "Sweet not found" });

    sweet.quantity += quantity;
    await sweet.save();

    res.json(sweet);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
  // ✅ Check stock for a specific sweet
export const checkStock = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const sweet = await Sweet.findById(id);
    if (!sweet) {
      return res.status(404).json({ message: "Sweet not found" });
    }

    res.status(200).json({
      sweet: sweet.name,
      stock: sweet.stock,
      message: sweet.stock > 0 ? "In stock" : "Out of stock",
    });
  } catch (error) {
    res.status(500).json({ message: "Error checking stock", error });
  }
};

