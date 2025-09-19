import React, { useState } from "react";
import InputField from "./InputField";
import { GiDonut, GiCakeSlice } from "react-icons/gi";

export interface RegisterFormData {
  name: string;
  email: string;
  password: string;
}

interface RegisterFormProps {
  onSubmit: (data: RegisterFormData) => void;
}

export default function RegisterForm({ onSubmit }: RegisterFormProps) {
  const [formData, setFormData] = useState<RegisterFormData>({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const isValid =
    formData.name.trim() !== "" &&
    formData.email.trim() !== "" &&
    formData.password.trim() !== "";

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
          <GiCakeSlice className="text-orange-500 text-4xl" />
          Sweet Shop Register
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <InputField
            id="name"
            label="Full Name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            required
          />
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

          {/* Button with icon */}
          <button
            type="submit"
            disabled={!isValid}
            className={`w-full py-3 rounded-full font-semibold flex items-center justify-center gap-2 transition 
              ${
                isValid
                  ? "bg-rose-500 text-white hover:bg-rose-600 shadow-md"
                  : "bg-rose-200 text-gray-400 cursor-not-allowed"
              }`}
          >
            Register <GiDonut className="text-xl" />
          </button>
        </form>

        {/* Footer text */}
        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <a
            href="#"
            className="text-rose-500 font-semibold hover:underline"
          >
            Login here
          </a>
        </p>
      </div>
    </div>
  );
}





