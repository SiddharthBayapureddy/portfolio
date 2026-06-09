# Portfolio - Siddharth Bayapureddy

This is the source code for Siddharth Bayapureddy's personal portfolio website. It showcases projects, blog posts, and professional background.

## Project Overview

- **Owner:** Siddharth Bayapureddy (CS Sophomore at BITS Pilani)
- **Primary Goal:** Professional showcase and technical blog.
- **Architecture:** Next.js 16 App Router with Supabase as the backend/database.
- **Styling:** Tailwind CSS 4 with Shadcn UI components.

## Tech Stack

- **Framework:** [Next.js 16](https://nextjs.org/) (App Router)
- **Language:** TypeScript
- **Database/Auth:** [Supabase](https://supabase.com/)
- **Styling:** [Tailwind CSS 4](https://tailwindcss.com/), [Shadcn UI](https://ui.shadcn.com/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Content:** `react-markdown` for blog posts, static content in `src/lib/portfolio-content.ts`.

## Project Structure

```text
src/
├── app/                  # Routes, layouts, and page components
│   ├── about/            # About page
│   ├── api/              # API routes (contact, analytics)
│   ├── blog/             # Blog index and post pages ([slug])
│   ├── contact/          # Contact page
│   └── projects/         # Projects showcase
├── components/           # Reusable UI components
│   ├── blog/             # Blog-specific components
│   ├── contact/          # Contact form components
│   ├── home/             # Home page sections (Hero, Featured)
│   ├── layout/           # Shared layout components (Navbar, Footer)
│   ├── projects/         # Project listing and cards
│   ├── shared/           # Cross-cutting components (Animations, Tags)
│   └── ui/               # Base Shadcn/UI primitives
├── lib/                  # Utilities, types, and core logic
│   ├── supabase/         # Supabase client configurations
│   ├── constants.ts      # Site-wide constants
│   ├── data.ts           # Dynamic data fetching (Supabase)
│   ├── portfolio-content.ts # Static content (skills, about me, initial projects)
│   └── types.ts          # TypeScript interfaces/types
└── supabase/             # Database migrations and configuration
    ├── schema.sql        # Database schema
    └── seed.sql          # Seed data
```

## Building and Running

### Development
```bash
npm run dev
```

### Production Build
```bash
npm run build
npm start
```

### Linting
```bash
npm run lint
```

## Development Conventions

- **Component Organization:** Follow the feature-based structure in `src/components`.
- **Data Fetching:** Use `src/lib/data.ts` for dynamic Supabase queries and `src/lib/portfolio-content.ts` for static configuration.
- **Styling:** Use Tailwind CSS 4 utility classes. Prefer vanilla CSS for complex animations if Framer Motion isn't suitable.
- **Icons:** Use `lucide-react` for iconography.
- **Typography:** Uses the Geist font family via `next/font`.

## Key Files

- `src/app/page.tsx`: Entry point for the landing page.
- `src/lib/portfolio-content.ts`: Contains the primary bio, skills, and hardcoded project data.
- `supabase/schema.sql`: Defines the database structure for projects, posts, and contact submissions.
- `src/components/shared/PageViewTracker.tsx`: Handles basic client-side analytics.

## Future Roadmap

- [ ] Implement robust blog post editing via an admin dashboard or CMS.
- [ ] Enhance project filtering with more categories and tags.
- [ ] Add dark/light mode toggle (currently defaults to theme-based).
- [ ] Integrate full SEO optimization for blog posts.
