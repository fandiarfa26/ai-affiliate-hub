import { articleRepository } from "./article.repository";
import prisma from "../../config/prisma";
import { CreateArticleDTO, UpdateArticleDTO } from "./article.types";

function slugifyTitle(t: string) {
  return t
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

async function ensureUniqueSlug(baseTitleOrSlug: string) {
  const base = slugifyTitle(baseTitleOrSlug);
  let slug = base;
  let i = 0;
  while (await prisma.article.findUnique({ where: { slug } })) {
    i += 1;
    slug = `${base}-${i}`;
  }
  return slug;
}

export const articleService = {
  getAll: () => {
    return articleRepository.findAll();
  },
  create: async (dto: CreateArticleDTO) => {
    const slug = dto.slug
      ? await ensureUniqueSlug(dto.slug)
      : await ensureUniqueSlug(dto.title);
    return articleRepository.create({ ...dto, slug });
  },
  getById: async (id: number) => {
    const article = await articleRepository.findById(id);
    if (!article) {
      const err: any = new Error("Article not found");
      err.status = 404;
      throw err;
    }
    return article;
  },
  update: async (id: number, dto: UpdateArticleDTO) => {
    const article = await articleRepository.findById(id);
    if (!article) {
      const err: any = new Error("Article not found");
      err.status = 404;
      throw err;
    }
    const data: UpdateArticleDTO = {};
    if (dto.title) {
      data.title = dto.title;
    }
    if (dto.body) {
      data.body = dto.body;
    }
    if (dto.status) {
      data.status = dto.status;
    }
    if (dto.affiliateLinkId) {
      data.affiliateLinkId = dto.affiliateLinkId;
    }

    return articleRepository.update(id, data);
  },
  delete: async (id: number) => {
    const article = await articleRepository.findById(id);
    if (!article) {
      const err: any = new Error("Article not found");
      err.status = 404;
      throw err;
    }
    return articleRepository.delete(id);
  },
};
