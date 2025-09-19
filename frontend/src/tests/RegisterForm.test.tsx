import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import React from "react";
import RegisterForm from "../components/RegisterForm";

test("submits form with name, email, and password", () => {
  const handleSubmit = jest.fn();
  render(<RegisterForm onSubmit={handleSubmit} />);

  fireEvent.change(screen.getByLabelText(/name/i), {
    target: { value: "Aditi" },
  });
  fireEvent.change(screen.getByLabelText(/email/i), {
    target: { value: "aditi@example.com" },
  });
  fireEvent.change(screen.getByLabelText(/password/i), {
    target: { value: "secret" },
  });

  fireEvent.click(screen.getByRole("button", { name: /register/i }));

  expect(handleSubmit).toHaveBeenCalledWith({
    name: "Aditi",
    email: "aditi@example.com",
    password: "secret",
  });
});

test("button is disabled if fields are empty", () => {
  const handleSubmit = jest.fn();
  render(<RegisterForm onSubmit={handleSubmit} />);

  expect(screen.getByRole("button", { name: /register/i })).toBeDisabled();
});

test("does not submit if fields are empty", () => {
  const handleSubmit = jest.fn();
  render(<RegisterForm onSubmit={handleSubmit} />);

  fireEvent.click(screen.getByRole("button", { name: /register/i }));
  expect(handleSubmit).not.toHaveBeenCalled();
});

test("password input is type password", () => {
  render(<RegisterForm onSubmit={() => {}} />);
  expect(screen.getByLabelText(/password/i)).toHaveAttribute(
    "type",
    "password"
  );
});