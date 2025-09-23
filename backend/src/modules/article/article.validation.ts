import Joi from "joi";

export const createArticleValidation = Joi.object({
  title: Joi.string().min(3).max(255).required(),
  body: Joi.string().allow(null, ""),
  status: Joi.string().valid("DRAFT", "PUBLISHED", "ARCHIVED"),
  affiliateLinkId: Joi.number().allow(null),
  captions: Joi.array().items(Joi.object({ text: Joi.string().required() })),
  slug: Joi.string()
    .pattern(/^[a-z0-9-]+$/)
    .lowercase(),
});

export const updateArticleValidation = Joi.object({
  title: Joi.string().min(3).max(255),
  body: Joi.string().allow(null, ""),
  status: Joi.string().valid("DRAFT", "PUBLISHED", "ARCHIVED"),
  affiliateLinkId: Joi.number().allow(null),
  captions: Joi.array().items(Joi.object({ text: Joi.string().required() })),
  slug: Joi.string()
    .pattern(/^[a-z0-9-]+$/)
    .lowercase(),
}).min(1);
