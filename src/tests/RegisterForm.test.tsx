import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import React from "react";

function RegisterForm() {
  return null; // not implemented yet
}

test("renders registration form with name, email, password and submit button", () => {
  render(<RegisterForm />);
  expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  expect(screen.getByRole("button", { name: /register/i })).toBeInTheDocument();
});
