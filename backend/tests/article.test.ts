import supertest from "supertest";
import app from "../src/app";

describe("GET /api/articles", () => {
  it("should return 200 and an array of articles", async () => {
    const result = await supertest(app).get("/api/articles");
    expect(result.status).toBe(200);
    expect(Array.isArray(result.body.data)).toBe(true);
    expect(result.body.data[0]).toHaveProperty("title");
  });
});
