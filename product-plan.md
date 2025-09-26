# 📑 Product Development Plan – AI Affiliate Product Content Creator Hub

## 1. Project Overview

### 🎯 Goal
Build an **AI Affiliate Product Content Creator Hub** that enables users to:
- Automatically generate product promotional articles in Indonesian using AI.  
- Insert affiliate links into the articles.  
- Publish articles publicly (SEO-friendly).  
- Create short captions for social media.  
- Access articles & captions via both **website** and **mobile application**.  

### 🌐 System Architecture
- **Frontend Web**: Next.js (creator side)  
- **Mobile App**: Flutter (reader side)  
- **Backend API**: Express.js or NestJS (RESTful API)  
- **Database**: PostgreSQL (Supabase or hosted)  
- **AI Service**: HuggingFace API (text generation)  

### 📦 Core MVP Features
- [x] User authentication & registration (API based).  
- [x] AI-powered article generation (via backend API → HuggingFace).  
- [x] Save & publish articles (API + DB).  
- [x] Affiliate link shortener (API).  
- [x] Caption generator (API).  
- [x] Website (creator side) & Mobile app (reader side).  

---

## 2. Development Timeline (1 Month, 24 Workdays)

### Week 1: Planning & Backend Setup
### Day 1
- [ ] Initialize project repository (monorepo or separate folders: `/backend`, `/frontend`, `/mobile`, `/docs`).
- [ ] Setup backend with **TypeScript + Express**.
- [ ] Configure ESLint, Prettier, ts-node-dev.
- [ ] Add testing framework: Jest + Supertest.
- [ ] Create basic `GET /health` endpoint with test.

### Day 2
- [ ] Define **system architecture** (backend, frontend, mobile, AI integration).
- [ ] Draft **database schema** (tables, fields, relations).
- [ ] Create **API specification** (REST endpoints, request/response format).
- [ ] Document in `/docs/architecture.md`.

### Day 3
- [ ] Setup PostgreSQL (or SQLite for dev).
- [ ] Create migration scripts for initial schema (users, articles, affiliate links).
- [ ] Connect database with TypeORM/Prisma.
- [ ] Implement `GET /articles` (dummy data).

### Day 4
- [ ] Implement `POST /articles` (create).
- [ ] Implement `GET /articles/:id`.
- [ ] Add unit tests for these endpoints.

### Day 5
- [ ] Implement `PUT /articles/:id` (update).
- [ ] Implement `DELETE /articles/:id`.
- [ ] Add tests for update & delete.

### Day 6
- [ ] Refactor codebase (separate controllers, services, routes).
- [ ] Improve error handling & validation (e.g., zod/joi).
- [ ] Ensure all tests green.

---

## Week 2: AI Integration & Basic Frontend
### Day 7
- [ ] Research HuggingFace free models for summarization / text generation (Indonesian support).
- [ ] Test integration via small script.
- [ ] Document integration steps.

### Day 8
- [ ] Create service in backend: `/ai/summarize` (input article → output summary).
- [ ] Write tests (mock API response).

### Day 9
- [ ] Extend AI service: `/ai/keywords` (extract keywords/hashtags).
- [ ] Add tests.

### Day 10
- [ ] Setup frontend project (Next.js + TypeScript).
- [ ] Configure TailwindCSS, ESLint, Prettier.
- [ ] Create landing page.

### Day 11
- [ ] Implement frontend page: article list (fetch from backend).
- [ ] Implement create article form.

### Day 12
- [ ] Connect frontend form → backend API.
- [ ] Display article details page.

---

## Week 3: Mobile App & Deeper Features
### Day 13
- [ ] Initialize mobile app with React Native (Expo + TypeScript).
- [ ] Setup navigation (React Navigation).
- [ ] Basic layout.

### Day 14
- [ ] Implement article list screen (fetch from backend).
- [ ] Implement create article screen.

### Day 15
- [ ] Implement article detail screen.
- [ ] Connect AI summarize feature (show summary).

### Day 16
- [ ] Add authentication system (JWT, login/register endpoints).
- [ ] Integrate auth into frontend & mobile.

### Day 17
- [ ] Add affiliate link field in articles.
- [ ] Display affiliate links in frontend & mobile.

### Day 18
- [ ] Implement analytics endpoint (track clicks/views).
- [ ] Connect frontend + mobile tracking.

---

## Week 4: Polish, Testing, Deployment
### Day 19
- [ ] Write integration tests for backend.
- [ ] Add unit tests for frontend components.
- [ ] Add unit tests for mobile components.

### Day 20
- [ ] Improve UI/UX (design polish for web + mobile).
- [ ] Add loading states, error messages.

### Day 21
- [ ] Deploy backend (Railway / Render free tier).
- [ ] Deploy frontend (Vercel).
- [ ] Test end-to-end integration.

### Day 22
- [ ] Publish mobile app as Expo project (shareable link).
- [ ] Test on real device.

### Day 23
- [ ] Write documentation:
  - `/docs/README.md` → how to run locally
  - `/docs/api.md` → API spec
  - `/docs/architecture.md` → system overview

### Day 24
- [ ] Buffer day: fix bugs, improve performance.

### Day 25
- [ ] Final testing (backend, frontend, mobile).
- [ ] Ensure AI integration works within free limits.
- [ ] Verify affiliate flow works end-to-end.

### Day 26
- [ ] Prepare presentation/demo video.
- [ ] Prepare screenshots for portfolio.

### Day 27
- [ ] Create GitHub repository (public).
- [ ] Add full README with setup guide, demo links, and screenshots.

### Day 28
- [ ] Launch! 🎉  
- [ ] Share project link in portfolio, LinkedIn, etc.
---

## 3. Deliverables
- **Backend**: RESTful API with Swagger docs.  
- **Frontend Web**: Creator dashboard (article creation, affiliate, captions).  
- **Mobile App**: Reader app for browsing articles.  
- **Documentation**: API docs + deployment guide + user guide.  
