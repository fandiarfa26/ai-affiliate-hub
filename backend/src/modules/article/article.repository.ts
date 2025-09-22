import prisma from "../../config/prisma";
import { CreateArticleDTO, UpdateArticleDTO } from "./article.types";

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
  update: (id: number, data: UpdateArticleDTO) => {
    return prisma.article.update({
      where: { id },
      data: {
        title: data.title,
        body: data.body ?? null,
        status: data.status ?? "DRAFT",
        affiliateLinkId: data.affiliateLinkId ?? null,
        authorId: 1,
        captions:
          data.captions && data.captions.length
            ? { create: data.captions }
            : undefined,
        publishedAt: data.status === "PUBLISHED" ? new Date() : null,
      },
      include: {
        captions: true,
        affiliateLink: true,
      },
    });
  },
  delete: (id: number) => {
    return prisma.article.delete({
      where: { id },
      include: {
        captions: true,
        affiliateLink: true,
      },
    });
  },
};
