# Sanity CMS Setup Guide

This guide covers Sanity project setup, environment variables, Studio deploy, and on-demand revalidation.

## Step 1: Create a Sanity Account and Project

1. Go to [https://www.sanity.io/](https://www.sanity.io/) and sign up for a free account
2. Once logged in, create a new project:
   - Click "Create new project"
   - Enter a project name (e.g., "Flowspace CMS")
   - Choose a dataset name (typically `production`)
   - Select the nearest region

## Step 2: Get Your Project Credentials

1. Go to [https://www.sanity.io/manage](https://www.sanity.io/manage)
2. Select your project
3. Go to **API** in the project settings
4. You'll need:
   - **Project ID** — under "Project ID" (e.g. `abc12345`)
   - **Dataset** — usually `production`
   - **API Token** (optional but recommended for preview mode)
     - Go to **API** → **Tokens**
     - Create a token with **Editor** permission (minimum to read draft content)
     - **Note:** Viewer only reads published content; use Editor or higher for preview mode

## Step 3: Configure Environment Variables

Create `.env.local` in the project root (see [`.env.example`](.env.example)):

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id_here
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_READ_TOKEN=your_read_token_here
SANITY_REVALIDATE_SECRET=your_webhook_secret_here
APP_URL=http://localhost:3000
```

**Notes:**

- `NEXT_PUBLIC_*` variables are exposed to the browser
- Never commit `.env.local` to git (already in `.gitignore`)
- Environment variables are validated at build time

## Step 4: Deploy Sanity Studio (optional)

Deploy Studio separately so editors can manage content without running the Next.js app locally.

This project includes a self-contained Studio in `sanity/` (`sanity.cli.ts`, `sanity.config.ts`, and `package.json`).

The Studio reads its own env file — copy `sanity/.env.example` to `sanity/.env` and set:

```env
SANITY_STUDIO_PROJECT_ID=your_project_id
SANITY_STUDIO_DATASET=production
```

> Only `SANITY_STUDIO_*` variables are exposed to the Studio bundle; the Next.js `NEXT_PUBLIC_*` vars are not visible to it.

Then deploy from the **repo root** (Studio deps install automatically):

```bash
npm run sanity:deploy
```

On first deploy, the CLI prompts you to choose a studio hostname (e.g. `flowspace-demo`). Your Studio URL will be `https://flowspace-demo.sanity.studio`.

If you are not logged in yet:

```bash
npx sanity login
```

Or host Studio at `/studio` in the Next.js app — see [Sanity + Next.js docs](https://www.sanity.io/docs/js-client).

## Step 5: Seed Demo Content

```bash
npm run seed:sanity:fresh
```

This clears and re-seeds blog posts, case studies, docs, features, pricing, and site settings.

## Step 6: On-Demand Revalidation Webhook

When content is published in Sanity, trigger ISR cache busting without a full redeploy:

1. Generate a secret (e.g. `openssl rand -hex 32`) and add it to `.env.local` as `SANITY_REVALIDATE_SECRET`
2. In [Sanity Manage](https://www.sanity.io/manage) → your project → **API** → **Webhooks** → **Create webhook**
3. Configure:
   - **URL:** `https://your-site.com/api/revalidate?secret=YOUR_SECRET`
   - **Dataset:** `production`
   - **Trigger on:** Create, Update, Delete
   - **Filter:** `_type in ["blogPost","docPage","caseStudy","feature","testimonial","pricingTier","pageHome","siteSettings"]`
4. Publish content in Studio — the site should revalidate within seconds

## Step 7: Verify Setup

Restart the dev server after setting env vars:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Missing required variables will surface as build-time errors.

## Resources

- [Sanity Documentation](https://www.sanity.io/docs)
- [Next.js + Sanity Integration](https://www.sanity.io/docs/js-client)
- [Sanity Project Management](https://www.sanity.io/manage)
