import prisma from "../../config/prisma";

export const authRepository = {
  findByEmail: async (email: string) => {
    return prisma.user.findUnique({ where: { email } });
  },
  createUser: async (email: string, hashedPassword: string, name: string) => {
    return prisma.user.create({
      data: { email, password: hashedPassword, name },
    });
  },
};
