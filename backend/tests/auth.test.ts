import supertest from "supertest";
import app from "../src/app";
import { authRepository } from "../src/modules/auth/auth.repository";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

jest.mock("../src/modules/auth/auth.repository", () => ({
  authRepository: {
    findByEmail: jest.fn(),
    createUser: jest.fn(),
  },
}));

describe("Auth endpoints", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("POST /api/auth/register", () => {
    it("should return 201 and create new user", async () => {
      (authRepository.findByEmail as jest.Mock).mockResolvedValue(null);
      const fakeUser = {
        id: 1,
        email: "a@b.com",
        password: "hashed",
        name: "abc",
      };
      (authRepository.createUser as jest.Mock).mockResolvedValue(fakeUser);

      const result = await supertest(app).post("/api/auth/register").send({
        email: "a@b.com",
        password: "secret",
        name: "abc",
      });
      expect(result.status).toBe(201);
      expect(result.body.data).toBeDefined();
      expect(result.body.data.email).toBe("a@b.com");
      expect(result.body.data.password).toBeUndefined();
      expect(authRepository.createUser).toHaveBeenCalled();
    });

    it("should return 409 if email already exists", async () => {
      (authRepository.findByEmail as jest.Mock).mockResolvedValue({
        id: 1,
        email: "a@b.com",
      });
      const result = await supertest(app).post("/api/auth/register").send({
        email: "a@b.com",
        password: "secret",
        name: "abc",
      });
      expect(result.status).toBe(409);
      expect(result.body.message).toMatch(/already/);
    });
  });

  describe("POST /api/auth/login", () => {
    it("should return 200, token, and success login", async () => {
      const hashed = await bcrypt.hash("secret", 10);
      (authRepository.findByEmail as jest.Mock).mockResolvedValue({
        id: 2,
        email: "b@b.com",
        password: hashed,
        name: "bcd",
      });

      const result = await supertest(app).post("/api/auth/login").send({
        email: "b@b.com",
        password: "secret",
      });

      expect(result.status).toBe(200);
      expect(result.body.data.accessToken).toBeDefined();
      const payload = jwt.decode(result.body.data.accessToken) as any;
      expect(payload.email).toBe("b@b.com");
    });

    it("should return 200, token, and success login", async () => {
      const hashed = await bcrypt.hash("secret", 10);
      (authRepository.findByEmail as jest.Mock).mockResolvedValue({
        id: 2,
        email: "b@b.com",
        password: hashed,
        name: "bcd",
      });

      const result = await supertest(app).post("/api/auth/login").send({
        email: "b@b.com",
        password: "wrong",
      });

      expect(result.status).toBe(401);
    });
  });
});
