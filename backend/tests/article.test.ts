import supertest from "supertest";
import app from "../src/app";
import prisma from "../src/config/prisma";

const removeTestArticle = async () => {
  await prisma.article.deleteMany({
    where: {
      title: "Test Article",
    },
  });
};

describe("GET /api/articles", () => {
  it("should return 200 and an array of articles", async () => {
    const result = await supertest(app).get("/api/articles");
    expect(result.status).toBe(200);
    expect(Array.isArray(result.body.data)).toBe(true);
    expect(result.body.data[0]).toHaveProperty("title");
  });
});

describe("POST /api/articles", () => {
  afterAll(async () => {
    await removeTestArticle();
  });

  it("should return 201 and create new test article", async () => {
    const result = await supertest(app).post("/api/articles").send({
      title: "Test Article",
      body: "Ini artikel dummy untuk testing endpoint POST /articles",
      status: "PUBLISHED",
    });

    expect(result.status).toBe(201);
    expect(result.body.data).toHaveProperty("title", "Test Article");
  });
});

describe("GET /api/articles/:id", () => {
  it("should return 200 and an article", async () => {
    const id = 1;
    const result = await supertest(app).get(`/api/articles/${id}`);
    expect(result.status).toBe(200);
    expect(result.body.data).toHaveProperty("title");
  });

  it("should return 404 if article not found", async () => {
    const id = 9999;
    const result = await supertest(app).get(`/api/articles/${id}`);
    console.info(result.body);
    expect(result.status).toBe(404);
  });

  it("should return 400 if id is not a number", async () => {
    const id = "abc";
    const result = await supertest(app).get(`/api/articles/${id}`);
    expect(result.status).toBe(400);
  });
});
