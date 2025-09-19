import prisma from "../../config/prisma";

export const articleRepository = {
  findAll: () => {
    return prisma.article.findMany({ orderBy: { createdAt: "desc" } });
  },
};
