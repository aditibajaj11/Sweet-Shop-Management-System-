import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Dashboard from "../components/Dashboard";

describe("Dashboard Page", () => {
  it("should display welcome text", () => {
    render(<Dashboard />);
    expect(screen.getByText(/welcome to the dashboard/i)).toBeInTheDocument();
  });

  it("should have navigation links", () => {
    render(<Dashboard />);
    expect(screen.getByText(/orders/i)).toBeInTheDocument();
    expect(screen.getByText(/inventory/i)).toBeInTheDocument();
    expect(screen.getByText(/sales report/i)).toBeInTheDocument();
  });
});
