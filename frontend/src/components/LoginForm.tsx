import React, { useState } from "react";
import InputField from "./InputField";
import { GiDonut } from "react-icons/gi";
import { Link } from "react-router-dom";

export interface LoginFormData {
  email: string;
  password: string;
}

interface LoginFormProps {
  onSubmit: (data: LoginFormData) => void;
}

export default function LoginForm({ onSubmit }: LoginFormProps) {
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const isValid =
    formData.email.trim() !== "" && formData.password.trim() !== "";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;
    onSubmit(formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 via-rose-50 to-orange-50">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8 border-t-8 border-rose-400">
        {/* Title with icon */}
        <h2 className="text-3xl font-bold text-center text-rose-600 mb-6 flex items-center justify-center gap-2">
          <GiDonut className="text-orange-500 text-4xl" />
          Sweet Shop Login
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <InputField
            id="email"
            label="Email Address"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <InputField
            id="password"
            label="Password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          {/* Button */}
          <button
            type="submit"
            disabled={!isValid}
            className={`w-full py-3 rounded-full font-semibold flex items-center justify-center gap-2 transition ${
              isValid
                ? "bg-rose-500 text-white hover:bg-rose-600 shadow-md"
                : "bg-rose-200 text-gray-400 cursor-not-allowed"
            }`}
          >
            Login
          </button>
        </form>

        {/* Footer text */}
        <p className="mt-6 text-center text-sm text-gray-600">
          Don’t have an account?{" "}
          <Link
    to="/register"
    className="text-rose-500 font-semibold hover:underline"
  >
    Register here
  </Link>
        </p>
      </div>
    </div>
  );
}

