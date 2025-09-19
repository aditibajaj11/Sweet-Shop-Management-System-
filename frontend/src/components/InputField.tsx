import React from "react";

interface InputFieldProps {
  id: string;
  label: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}

export default function InputField({
  id,
  label,
  type,
  value,
  onChange,
  required = false,
}: InputFieldProps) {
  return (
    <div className="mb-4">
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-600 mb-1"
      >
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full px-4 py-2 border border-pink-200 rounded-xl shadow-sm 
                   focus:outline-none focus:ring-2 focus:ring-pink-400"
      />
    </div>
  );
}
