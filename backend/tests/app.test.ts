import supertest from "supertest";
import app from "../src/app";

describe("GET /api", () => {
  it("should can run backend", async () => {
    const response = await supertest(app).get("/api");
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("message", "Backend running...");
  });
});

describe("GET /api/health", () => {
  it("should return database connected", async () => {
    const res = await supertest(app).get("/api/health");

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      status: "ok",
      db: "connected",
    });
  });
});
