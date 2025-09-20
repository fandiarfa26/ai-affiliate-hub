import prisma from "../../config/prisma";
import { CreateArticleDTO } from "./article.types";

export const articleRepository = {
  findAll: () => {
    return prisma.article.findMany({ orderBy: { createdAt: "desc" } });
  },
  create: (data: CreateArticleDTO & { slug: string }) => {
    const { captions, ...rest } = data;
    return prisma.article.create({
      data: {
        title: rest.title,
        body: rest.body ?? null,
        status: rest.status ?? "DRAFT",
        slug: rest.slug,
        affiliateLinkId: rest.affiliateLinkId ?? null,
        authorId: 1,
        captions:
          captions && captions.length ? { create: captions } : undefined,
        publishedAt: rest.status === "PUBLISHED" ? new Date() : null,
      },
      include: {
        captions: true,
        affiliateLink: true,
      },
    });
  },
  findById: (id: number) => {
    return prisma.article.findUnique({
      where: { id },
      include: {
        captions: true,
        affiliateLink: true,
      },
    });
  },
};
