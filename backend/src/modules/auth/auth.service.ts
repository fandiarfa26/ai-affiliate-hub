import { signPayload } from "../../config/jwt";
import { authRepository } from "./auth.repository";
import { AuthPayload, LoginDTO, RegisterDTO } from "./auth.types";
import bcrypt from "bcrypt";

export const authService = {
  register: async (dto: RegisterDTO) => {
    const existing = await authRepository.findByEmail(dto.email);
    if (existing) {
      throw new Error("EMAIL_EXISTS");
    }

    const hashed = await bcrypt.hash(dto.password, 10);
    const user = await authRepository.createUser(dto.email, hashed, dto.name);

    const { password, ...safeUser } = user as any;
    return safeUser;
  },
  login: async (dto: LoginDTO): Promise<{ token: string }> => {
    const user = await authRepository.findByEmail(dto.email);
    if (!user) {
      throw new Error("INVALID_CREDENTIALS");
    }
    const valid = await bcrypt.compare(dto.password, user.password);
    if (!valid) {
      throw new Error("INVALID_CREDENTIALS");
    }
    const payload: AuthPayload = {
      id: user.id,
      email: user.email,
      name: user.name ?? "No Name",
    };

    const token = signPayload(payload);
    return { token };
  },
};
