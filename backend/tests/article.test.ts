import supertest from "supertest";
import app from "../src/app";
import prisma from "../src/config/prisma";

const removeTestArticle = async () => {
  await prisma.article.deleteMany({
    where: {
      slug: "test-article",
    },
  });
};

const createTestArticle = async () => {
  await prisma.article.create({
    data: {
      slug: "test-article",
      title: "Test Article",
      body: "Ini artikel dummy",
      status: "PUBLISHED",
      authorId: 1,
    },
  });
};

const getTestArticle = async () => {
  return await prisma.article.findUnique({
    where: {
      slug: "test-article",
    },
  });
};

describe("GET /api/articles", () => {
  beforeEach(async () => {
    await createTestArticle();
  });

  afterEach(async () => {
    await removeTestArticle();
  });

  it("should return 200 and an array of articles", async () => {
    const result = await supertest(app).get("/api/articles");
    expect(result.status).toBe(200);
    expect(Array.isArray(result.body.data)).toBe(true);
    expect(result.body.data[0]).toHaveProperty("title");
  });
});

describe("POST /api/articles", () => {
  afterEach(async () => {
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

  it("should return 400 if title is not provided", async () => {
    const result = await supertest(app).post("/api/articles").send({
      body: "Ini artikel dummy untuk testing endpoint POST /articles",
      status: "PUBLISHED",
    });

    expect(result.status).toBe(400);
  });
});

describe("GET /api/articles/:id", () => {
  beforeEach(async () => {
    await createTestArticle();
  });

  afterEach(async () => {
    await removeTestArticle();
  });

  it("should return 200 and an article", async () => {
    const article = await getTestArticle();
    const id = article?.id ?? 1;
    const result = await supertest(app).get(`/api/articles/${id}`);
    expect(result.status).toBe(200);
    expect(result.body.data).toHaveProperty("title");
  });

  it("should return 404 if article not found", async () => {
    const id = 9999;
    const result = await supertest(app).get(`/api/articles/${id}`);
    expect(result.status).toBe(404);
  });

  it("should return 400 if id is not a number", async () => {
    const id = "abc";
    const result = await supertest(app).get(`/api/articles/${id}`);
    expect(result.status).toBe(400);
  });
});

describe("PUT /api/articles/:id", () => {
  beforeEach(async () => {
    await createTestArticle();
  });

  afterEach(async () => {
    await removeTestArticle();
  });

  it("should return 200 and update an article", async () => {
    const article = await getTestArticle();
    const id = article?.id ?? 1;
    const result = await supertest(app).put(`/api/articles/${id}`).send({
      title: "Test Article Updated",
    });
    expect(result.status).toBe(200);
    expect(result.body.data).toHaveProperty("title", "Test Article Updated");
  });

  it("should return 404 if article not found", async () => {
    const id = 9999;
    const result = await supertest(app).put(`/api/articles/${id}`).send({
      title: "Test Article Updated",
    });
    expect(result.status).toBe(404);
  });

  it("should return 400 if id is not a number", async () => {
    const id = "abc";
    const result = await supertest(app).put(`/api/articles/${id}`).send({
      title: "Test Article Updated",
    });
    expect(result.status).toBe(400);
  });

  it("should return 400 if payload is empty", async () => {
    const article = await getTestArticle();
    const id = article?.id ?? 1;
    const result = await supertest(app).put(`/api/articles/${id}`).send({});
    expect(result.status).toBe(400);
  });
});

describe("DELETE /api/articles/:id", () => {
  beforeEach(async () => {
    await createTestArticle();
  });

  afterEach(async () => {
    await removeTestArticle();
  });

  it("should return 200 and delete an article", async () => {
    const article = await getTestArticle();
    const id = article?.id ?? 1;
    const result = await supertest(app).delete(`/api/articles/${id}`);
    expect(result.status).toBe(200);
  });

  it("should return 404 if article not found", async () => {
    const id = 9999;
    const result = await supertest(app).delete(`/api/articles/${id}`);
    expect(result.status).toBe(404);
  });

  it("should return 400 if id is not a number", async () => {
    const id = "abc";
    const result = await supertest(app).delete(`/api/articles/${id}`);
    expect(result.status).toBe(400);
  });
});
