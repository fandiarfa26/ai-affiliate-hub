export interface CreateArticleDTO {
  title: string;
  body?: string | null;
  status?: "DRAFT" | "PUBLISHED" | "ARCHIVED";
  affiliateLinkId?: number | null;
  captions?: { text: string }[];
  slug?: string;
}

export interface UpdateArticleDTO {
  title?: string;
  body?: string | null;
  status?: "DRAFT" | "PUBLISHED" | "ARCHIVED";
  affiliateLinkId?: number | null;
  captions?: { text: string }[];
  slug?: string;
}
