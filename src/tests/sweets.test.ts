import request from "supertest";
import { app } from "../index";
import User from "../models/User";
import Sweet from "../models/Sweet";

let adminToken: string;
let userToken: string;

beforeEach(async () => {
  await User.deleteMany({});
  await Sweet.deleteMany({});

  // Create admin
  const adminRes = await request(app)
    .post("/api/auth/register")
    .send({
      name: "Admin User",
      email: "admin1@example.com",
      password: "password123",
      isAdmin: true,    // ✅ matches your User model
    });
  adminToken = adminRes.body.token;

  // Create user
  const userRes = await request(app)
    .post("/api/auth/register")
    .send({
      name: "Normal User",
      email: "user1@example.com",
      password: "password123",
      isAdmin: false,
    });
  userToken = userRes.body.token;
});

describe("Sweet API", () => {
  it("should allow admin to create a sweet", async () => {
    const res = await request(app)
      .post("/api/sweets")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({ name: "Ladoo", price: 50, description: "Delicious sweet" });

    expect(res.status).toBe(201);
    expect(res.body.name).toBe("Ladoo");
  });

  it("should NOT allow user to create a sweet", async () => {
    const res = await request(app)
      .post("/api/sweets")
      .set("Authorization", `Bearer ${userToken}`)
      .send({ name: "Jalebi", price: 30 });

    expect(res.status).toBe(403);
  });

  it("should allow anyone with token to get sweets", async () => {
    // create a sweet
    await Sweet.create({ name: "Barfi", price: 40 });

    const res = await request(app)
      .get("/api/sweets")
      .set("Authorization", `Bearer ${userToken}`);

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it("should allow admin to update a sweet", async () => {
    const sweet = await Sweet.create({ name: "Barfi", price: 40 });

    const res = await request(app)
      .put(`/api/sweets/${sweet._id}`)
      .set("Authorization", `Bearer ${adminToken}`)
      .send({ price: 45 });

    expect(res.status).toBe(200);
    expect(res.body.price).toBe(45);
  });

  it("should allow admin to delete a sweet", async () => {
    const sweet = await Sweet.create({ name: "Rasgulla", price: 60 });

    const res = await request(app)
      .delete(`/api/sweets/${sweet._id}`)
      .set("Authorization", `Bearer ${adminToken}`);

    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Sweet deleted successfully");
  });
});

