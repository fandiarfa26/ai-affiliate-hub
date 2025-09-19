// prisma/seed.ts
import { PrismaClient } from "../generated/prisma";
const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.upsert({
    where: { email: "dev@example.com" },
    update: {},
    create: {
      email: "dev@example.com",
      password: "secret", // hanya dummy untuk testing
      name: "Dev",
    },
  });

  const link = await prisma.affiliateLink.create({
    data: {
      productUrl: "https://example.com/product",
      shortUrl: "exmpl",
    },
  });

  const article = await prisma.article.create({
    data: {
      title: "Dummy Article for Day 3",
      slug: "dummy-article-day-3",
      body: "Ini artikel dummy untuk testing endpoint GET /articles",
      status: "PUBLISHED",
      authorId: user.id,
      affiliateLinkId: link.id,
    },
  });

  console.log({ user, link, article });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
