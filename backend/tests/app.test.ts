import supertest from "supertest";
import app from "../src/app";

describe("GET /", () => {
  it("should can run backend", async () => {
    const response = await supertest(app).get("/");
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("message", "Backend running...");
  });
});

describe("GET /health", () => {
  it("should return database connected", async () => {
    const res = await supertest(app).get("/health");

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      status: "ok",
      db: "connected",
    });
  });
});
