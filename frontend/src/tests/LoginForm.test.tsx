import { render, screen, fireEvent } from "@testing-library/react";
import LoginForm from "../components/LoginForm";

describe("LoginForm", () => {
  test("renders login form fields", () => {
    render(<LoginForm onSubmit={() => {}} />);

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /login/i })).toBeDisabled();
  });

  test("enables submit button when fields are filled", () => {
    const mockSubmit = jest.fn();
    render(<LoginForm onSubmit={mockSubmit} />);

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "password123" },
    });

    const button = screen.getByRole("button", { name: /login/i });
    expect(button).not.toBeDisabled();

    fireEvent.click(button);
    expect(mockSubmit).toHaveBeenCalledWith({
      email: "test@example.com",
      password: "password123",
    });
  });
});
