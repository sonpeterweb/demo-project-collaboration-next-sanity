# Flowspace

A marketing and collaboration platform built with Next.js and Sanity CMS. Flowspace helps teams showcase product content, publish blog posts and documentation, collect contact submissions, and manage content through an authenticated admin panel.

## Features

- Marketing pages powered by Sanity (home, features, pricing, about, case studies, contact)
- Blog, documentation hub, and dynamic SEO (sitemap, robots, metadata)
- GitHub OAuth admin panel with CRUD for blog posts, testimonials, and pricing
- Preview mode for draft Sanity content
- ISR caching, optimized Sanity images, and accessibility improvements
- Jest unit tests and Playwright e2e tests

## Getting started

### 1. Install dependencies

```bash
npm install
```

### 2. Set up environment variables

Copy `.env.example` to `.env.local` and fill in the required values:

- Sanity project ID, dataset, and API token
- GitHub OAuth credentials for the admin panel
- `APP_URL`, `NEXTAUTH_SECRET`, and related auth settings

### 3. Prepare Husky (optional)

```bash
npm run prepare
```

### 4. Seed demo content (optional)

```bash
npm run seed:sanity
```

### 5. Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm test` | Run unit tests |
| `npm run e2e` | Run Playwright e2e tests |
| `npm run seed:sanity` | Seed Sanity with demo content |
| `npm run lint` | Lint the codebase |
| `npm run typecheck` | TypeScript type check |

## Project structure

```bash
.
├── sanity/              # Sanity schema and Studio config
├── scripts/             # Utility scripts (e.g. seed)
└── src
    ├── app/             # Next.js App Router pages and API routes
    ├── components/      # React components
    ├── lib/             # Utilities, Sanity client, SEO helpers
    └── styles/          # Global styles
```
