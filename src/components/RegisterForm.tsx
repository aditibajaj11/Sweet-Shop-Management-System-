import React, { useState } from "react";

interface RegisterFormProps {
  onSubmit: (data: RegisterFormData) => void;
}

interface RegisterFormData {
  name: string;
  email: string;
  password: string;
}

function InputField({
  id,
  label,
  type,
  value,
  onChange,
}: {
  id: string;
  label: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input id={id} name={id} type={type} value={value} onChange={onChange} />
    </div>
  );
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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
      />

      <InputField
        id="email"
        label="Email"
        type="email"
        value={formData.email}
        onChange={handleChange}
      />

      <InputField
        id="password"
        label="Password"
        type="password"
        value={formData.password}
        onChange={handleChange}
      />

      <button type="submit">Register</button>
    </form>
  );
}

