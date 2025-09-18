# System Architecture & Design

## 1. System Architecture (high-level)

### Backend (API)

- Framework: Express.js + TypeScript. 
- ORM: Prisma (connect to Supabase PostgreSQL). 
- Auth: JWT. 
- Hosting: Render (Free Plan).

### Database
- PostgreSQL (managed by Supabase Free Plan, 500 MB).

### AI Service 
- HuggingFace API (text generation & summarization)\
- Backend -> call HuggingFace -> save to Supabase DB

### Frontend Web (Creator Side) 
- Framework:Next.js (React & TypeScript).
- Hosting: Vercel (Free Plan).

### Mobile App (Reader Side)
- Framework: Flutter (Android/iOS).

### Storage (media assets)
- Supabase storage (50 MB free).

## 2. Database Schema (draft)

```prisma
model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  password  String
  name      String?
  role      Role     @default(USER)
  articles  Article[]
  media     MediaAsset[]
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

enum Role {
  USER
  ADMIN
}

model Article {
  id              Int          @id @default(autoincrement())
  title           String
  slug            String       @unique
  body            String?
  status          ArticleStatus @default(DRAFT)
  authorId        Int
  author          User         @relation(fields: [authorId], references: [id])
  affiliateLinkId Int?
  affiliateLink   AffiliateLink? @relation(fields: [affiliateLinkId], references: [id])
  captions        Caption[]
  aiJobs          AIJob[]
  publishedAt     DateTime?
  createdAt       DateTime      @default(now())
  updatedAt       DateTime      @updatedAt
}

enum ArticleStatus {
  DRAFT
  PUBLISHED
  ARCHIVED
}

model AffiliateLink {
  id        Int      @id @default(autoincrement())
  productUrl String
  shortUrl   String   @unique
  clicks     Int      @default(0)
  articles   Article[]
  events     ClickEvent[]
  createdAt  DateTime @default(now())
}

model Caption {
  id        Int      @id @default(autoincrement())
  articleId Int
  article   Article  @relation(fields: [articleId], references: [id])
  text      String
  createdAt DateTime @default(now())
}

model AIJob {
  id        Int      @id @default(autoincrement())
  type      String
  prompt    String?
  status    AIJobStatus @default(PENDING)
  result    String?
  articleId Int?
  article   Article? @relation(fields: [articleId], references: [id])
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

enum AIJobStatus {
  PENDING
  PROCESSING
  SUCCESS
  FAILED
}

model ClickEvent {
  id              Int           @id @default(autoincrement())
  affiliateLinkId Int
  affiliateLink   AffiliateLink @relation(fields: [affiliateLinkId], references: [id])
  ip        String?
  userAgent String?
  referrer  String?
  createdAt DateTime @default(now())
}

model MediaAsset {
  id           Int      @id @default(autoincrement())
  filename     String
  key          String
  url          String
  mimeType     String
  size         Int
  uploadedById Int?
  uploadedBy   User?    @relation(fields: [uploadedById], references: [id])
  createdAt    DateTime @default(now())
}
```

## 3. API Specification

Open with Swagger: `docs/api-spec.yaml`

