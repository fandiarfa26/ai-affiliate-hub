import { articleRepository } from "./article.repository";

export const articleService = {
  getAll: () => {
    return articleRepository.findAll();
  },
};
