import React, { useState } from "react";
import InputField from "./InputField";

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
    <form onSubmit={handleSubmit}>
      <InputField
        id="name"
        label="Name"
        type="text"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <InputField
        id="email"
        label="Email"
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
      <button type="submit" disabled={!isValid}>
        Register
      </button>
    </form>
  );
}



