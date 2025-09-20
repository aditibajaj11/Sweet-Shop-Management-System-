import React, { useEffect, useState } from "react";
import {
  getSweets,
  purchaseSweet,
  restockSweet,
  deleteSweet,
  updateSweet,
  createSweet,
} from "../api/sweet";
import {
  FaCandyCane,
  FaShoppingCart,
  FaBoxOpen,
  FaPlusCircle,
  FaSyncAlt,
  FaTrash,
  FaEdit,
} from "react-icons/fa";
import { motion } from "framer-motion"; 

interface Sweet {
  _id: string;
  name: string;
  category: string;
  price: number;
  quantity: number;
}

export default function Dashboard() {
  const role = localStorage.getItem("role");
  const token = localStorage.getItem("token");
  const [sweets, setSweets] = useState<Sweet[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [purchaseQty, setPurchaseQty] = useState<{ [key: string]: number }>({});
  const [restockQty, setRestockQty] = useState<{ [key: string]: number }>({});
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<Sweet>>({});
  const [searchQuery, setSearchQuery] = useState("");
  const [newSweetForm, setNewSweetForm] = useState({
    name: "",
    category: "",
    price: 0,
    quantity: 0,
  });

  const [cart, setCart] = useState<{ sweet: Sweet; qty: number }[]>([]);

  const formatPrice = (p: number) => `$${p}`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getSweets(token!);
        setSweets(data);
      } catch (err) {
        console.error("Error fetching sweets:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [token]);

  const handleAddToCart = (sweet: Sweet) => {
    const qty = purchaseQty[sweet._id] || 1;
    if (qty > sweet.quantity) return;
    setCart((prev) => {
      const existing = prev.find((c) => c.sweet._id === sweet._id);
      if (existing) {
        return prev.map((c) =>
          c.sweet._id === sweet._id ? { ...c, qty: c.qty + qty } : c
        );
      }
      return [...prev, { sweet, qty }];
    });
  };

  const handleCheckout = async () => {
    try {
      for (const item of cart) {
        await purchaseSweet(item.sweet._id, item.qty, token!);
      }
      setSweets((prev) =>
        prev.map((s) => {
          const item = cart.find((c) => c.sweet._id === s._id);
          return item ? { ...s, quantity: s.quantity - item.qty } : s;
        })
      );
      setCart([]);
      alert("Purchase successful!");
    } catch (err) {
      console.error("Checkout failed:", err);
      alert("Purchase failed. Try again.");
    }
  };

  const handleRestock = async (id: string) => {
    try {
      const qty = restockQty[id] || 1;
      await restockSweet(id, qty, token!);
      setSweets((prev) =>
        prev.map((s) => (s._id === id ? { ...s, quantity: s.quantity + qty } : s))
      );
    } catch (err) {
      console.error("Restock failed:", err);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteSweet(id, token!);
      setSweets((prev) => prev.filter((s) => s._id !== id));
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  const startEdit = (sweet: Sweet) => {
    setEditingId(sweet._id);
    setEditForm({ ...sweet });
  };

  const handleUpdate = async () => {
    if (!editingId) return;
    try {
      const updated = await updateSweet(editingId, editForm, token!);
      setSweets((prev) => prev.map((s) => (s._id === editingId ? updated : s)));
      setEditingId(null);
      setEditForm({});
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  const handleAddNewSweet = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const newSweet = await createSweet(newSweetForm, token!);
      setSweets((prev) => [...prev, newSweet]);
      setNewSweetForm({ name: "", category: "", price: 0, quantity: 0 });
    } catch (err) {
      console.error("Add new sweet failed:", err);
    }
  };

  const filteredSweets = sweets.filter(
    (sweet) =>
      sweet.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sweet.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) return <p className="p-6">Loading sweets...</p>;
  if (error) return <p className="p-6 text-center text-red-600">Error loading sweets</p>;

  return (
    <div className="p-6 min-h-screen bg-gradient-to-br from-pink-50 to-pink-100">
      {/* Header */}
      <div className="flex flex-col items-center mb-12">
        <motion.div
          animate={{ rotate: [0, 15, -15, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="text-5xl text-pink-500"
        >
          <FaCandyCane />
        </motion.div>
        <h1 className="text-5xl font-extrabold mt-4 text-pink-700 drop-shadow-lg text-center">
          Sweet Shop Dashboard
        </h1>
      </div>

      {/* Admin add form */}
      {role === "admin" && (
        <>
          <h2 className="text-2xl font-semibold mb-4 text-pink-600 flex items-center gap-2">
            <FaPlusCircle /> Add a New Sweet
          </h2>
          <form
            onSubmit={handleAddNewSweet}
            className="bg-white p-6 rounded-xl shadow-lg mb-12 border border-pink-200"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <input
                className="border p-2 rounded w-full"
                placeholder="Name"
                value={newSweetForm.name}
                onChange={(e) =>
                  setNewSweetForm({ ...newSweetForm, name: e.target.value })
                }
                required
              />
              <input
                className="border p-2 rounded w-full"
                placeholder="Category"
                value={newSweetForm.category}
                onChange={(e) =>
                  setNewSweetForm({ ...newSweetForm, category: e.target.value })
                }
                required
              />
              <input
                type="number"
                className="border p-2 rounded w-full"
                placeholder="Price"
                value={newSweetForm.price}
                onChange={(e) =>
                  setNewSweetForm({
                    ...newSweetForm,
                    price: Number(e.target.value),
                  })
                }
                min="0"
                required
              />
              <input
                type="number"
                className="border p-2 rounded w-full"
                placeholder="Quantity"
                value={newSweetForm.quantity}
                onChange={(e) =>
                  setNewSweetForm({
                    ...newSweetForm,
                    quantity: Number(e.target.value),
                  })
                }
                min="0"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-pink-600 text-white mt-6 px-6 py-2 rounded-lg hover:bg-pink-700 transition shadow-md"
            >
              Add Sweet
            </button>
          </form>
        </>
      )}

      {/* Cart */}
      {role === "user" && cart.length > 0 && (
        <div className="mb-12 bg-white p-6 rounded-xl shadow-lg border border-green-200">
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2 text-green-700">
            <FaShoppingCart /> Your Cart
          </h2>
          <ul className="mb-4">
            {cart.map((item) => (
              <li key={item.sweet._id} className="flex justify-between mb-2">
                <span>
                  {item.sweet.name} × {item.qty}
                </span>
                <span>{formatPrice(item.sweet.price * item.qty)}</span>
              </li>
            ))}
          </ul>
          <button
            onClick={handleCheckout}
            className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700 transition"
          >
            Checkout
          </button>
        </div>
      )}

      {/* Search + Available */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-10 gap-4">
        <h2 className="text-2xl font-semibold text-pink-700">
          🍬 Available Sweets
        </h2>
        <input
          type="text"
          placeholder="Search sweets..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border p-3 rounded-lg w-full md:w-1/3 shadow-md"
        />
      </div>

      {/* Sweets Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {filteredSweets.length > 0 ? (
          filteredSweets.map((sweet) => (
            <div
              key={sweet._id}
              className="bg-white border border-pink-200 rounded-2xl p-6 shadow-md hover:shadow-xl transition transform hover:-translate-y-1"
            >
              {editingId === sweet._id ? (
                <div>
                  <input
                    className="border p-2 rounded w-full mb-2"
                    value={editForm.name || ""}
                    onChange={(e) =>
                      setEditForm({ ...editForm, name: e.target.value })
                    }
                  />
                  <input
                    className="border p-2 rounded w-full mb-2"
                    value={editForm.category || ""}
                    onChange={(e) =>
                      setEditForm({ ...editForm, category: e.target.value })
                    }
                  />
                  <input
                    type="number"
                    className="border p-2 rounded w-full mb-2"
                    value={editForm.price || 0}
                    onChange={(e) =>
                      setEditForm({
                        ...editForm,
                        price: Number(e.target.value),
                      })
                    }
                  />
                  <input
                    type="number"
                    className="border p-2 rounded w-full mb-2"
                    value={editForm.quantity || 0}
                    onChange={(e) =>
                      setEditForm({
                        ...editForm,
                        quantity: Number(e.target.value),
                      })
                    }
                  />
                  <div className="flex gap-2">
                    <button
                      className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                      onClick={handleUpdate}
                    >
                      Save
                    </button>
                    <button
                      className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500 transition"
                      onClick={() => setEditingId(null)}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <h3 className="text-xl font-bold mb-2 text-pink-700">
                    {`${sweet.name} - ${formatPrice(sweet.price)}`}
                  </h3>
                  <p className="text-gray-600">
                    Category: <span className="font-medium">{sweet.category}</span>
                  </p>
                  <p className="text-gray-600">{`In stock: ${sweet.quantity}`}</p>

                  {role === "user" && (
                    <div className="mt-4 flex items-center gap-2">
                      <input
                        type="number"
                        min="1"
                        max={sweet.quantity}
                        value={purchaseQty[sweet._id] ?? 1}
                        onChange={(e) =>
                          setPurchaseQty((prev) => ({
                            ...prev,
                            [sweet._id]: Number(e.target.value),
                          }))
                        }
                        className="border p-2 rounded-lg w-20 text-center"
                      />
                      <button
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition disabled:bg-gray-400"
                        disabled={
                          sweet.quantity === 0 ||
                          (purchaseQty[sweet._id] > sweet.quantity)
                        }
                        onClick={() => handleAddToCart(sweet)}
                      >
                        {sweet.quantity === 0 ? "Out of Stock" : "Add to Cart"}
                      </button>
                    </div>
                  )}

                  {role === "admin" && (
                    <div className="flex gap-2 mt-4 flex-wrap items-center">
                      <input
                        type="number"
                        min="1"
                        value={restockQty[sweet._id] || 1}
                        onChange={(e) =>
                          setRestockQty((prev) => ({
                            ...prev,
                            [sweet._id]: Number(e.target.value),
                          }))
                        }
                        className="border p-2 rounded-lg w-20 text-center"
                      />
                      <button
                        className="bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-600 transition flex items-center gap-1"
                        onClick={() => handleRestock(sweet._id)}
                      >
                        <FaSyncAlt /> Restock
                      </button>
                      <button
                        className="bg-yellow-500 text-white px-3 py-1 rounded-lg hover:bg-yellow-600 transition flex items-center gap-1"
                        onClick={() => startEdit(sweet)}
                      >
                        <FaEdit /> Update
                      </button>
                      <button
                        className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition flex items-center gap-1"
                        onClick={() => handleDelete(sweet._id)}
                      >
                        <FaTrash /> Delete
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          ))
        ) : (
          <p className="text-center col-span-full text-gray-500">
            No sweets found. Try a different search! <FaBoxOpen className="inline" />
          </p>
        )}
      </div>
    </div>
  );
}
