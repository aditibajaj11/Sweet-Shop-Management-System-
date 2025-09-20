import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Dashboard from "../components/Dashboard";
import * as sweetApi from "../api/sweet";
// Mock localStorage
const mockLocalStorage: Record<string, string> = {};
beforeAll(() => {
  Object.defineProperty(window, "localStorage", {
    value: {
      getItem: (key: string) => mockLocalStorage[key],
      setItem: (key: string, value: string) => {
        mockLocalStorage[key] = value;
      },
      removeItem: (key: string) => {
        delete mockLocalStorage[key];
      },
      clear: () => {
        Object.keys(mockLocalStorage).forEach((key) => delete mockLocalStorage[key]);
      },
    },
    writable: true,
  });
});

// Mock API
jest.mock("../api/sweet");
const mockSweets = [
  { _id: "1", name: "Ladoo", price: 10, quantity: 5 },
  { _id: "2", name: "Barfi", price: 20, quantity: 3 },
];

beforeEach(() => {
  jest.clearAllMocks();
  window.localStorage.clear();
  mockLocalStorage["role"] = "user";
  mockLocalStorage["token"] = "fake-token";

  (sweetApi.getSweets as jest.Mock).mockResolvedValue(mockSweets);
});

describe("Dashboard", () => {
  it("should display a loading message initially", () => {
    (sweetApi.getSweets as jest.Mock).mockReturnValue(new Promise(() => {}));
    render(<Dashboard />);
    expect(screen.getByText(/Loading sweets.../i)).toBeInTheDocument();
  });

  it("should display sweets when API returns data", async () => {
    render(<Dashboard />);
    const sweet1 = await screen.findByText("Ladoo - $10");
    const sweet2 = await screen.findByText("Barfi - $20");

    expect(sweet1).toBeInTheDocument();
    expect(sweet2).toBeInTheDocument();
  });

  it("should allow user to purchase a sweet and decrease quantity", async () => {
    render(<Dashboard />);
    const buyButtons = await screen.findAllByText("Buy");
    fireEvent.click(buyButtons[0]);

    await waitFor(() => {
      expect(screen.queryByText("In stock: 5")).not.toBeInTheDocument();
      expect(screen.getByText("In stock: 4")).toBeInTheDocument();
    });
  });

  it("should show admin controls if role is admin", async () => {
    mockLocalStorage["role"] = "admin";
    render(<Dashboard />);
    await screen.findByText("Ladoo - $10");

    expect(screen.getAllByText("Restock")[0]).toBeInTheDocument();
    expect(screen.getAllByText("Delete")[0]).toBeInTheDocument();
  });

  it("should handle API error", async () => {
    (sweetApi.getSweets as jest.Mock).mockRejectedValue(new Error("API Error"));
    render(<Dashboard />);
    const errorMessage = await screen.findByText(/Error loading sweets/i);
    expect(errorMessage).toBeInTheDocument();
  });
});
