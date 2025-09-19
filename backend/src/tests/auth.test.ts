import request from "supertest";
import { app } from "../index";
import User from "../models/User";

let token: string;

beforeEach(async () => {
  await User.deleteMany({});
});

describe("Auth Routes", () => {
  it("should register a new user", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send({
        name: "Test User",        // ✅ match your User model
        email: "test@example.com",
        password: "password123",
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("token");
  });

  it("should login the user", async () => {
    // first register
    await request(app).post("/api/auth/register").send({
      name: "Test User",
      email: "test@example.com",
      password: "password123",
    });

    const res = await request(app).post("/api/auth/login").send({
      email: "test@example.com",
      password: "password123",
    });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("token");

    token = res.body.token;
  });

  it("should access protected route with token", async () => {
    // register + login
    await request(app).post("/api/auth/register").send({
      name: "Test User",
      email: "test2@example.com",
      password: "password123",
    });
    const loginRes = await request(app).post("/api/auth/login").send({
      email: "test2@example.com",
      password: "password123",
    });

    const res = await request(app)
      .get("/api/protected/profile")
      .set("Authorization", `Bearer ${loginRes.body.token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("user");
  });

  it("should not access protected route without token", async () => {
    const res = await request(app).get("/api/protected/profile");
    expect(res.statusCode).toBe(401);
  });
});

