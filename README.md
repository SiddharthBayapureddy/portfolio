# Siddharth's Portfolio

A modern, highly interactive portfolio website built with Next.js 16, React 19, and TailwindCSS 4. Welcome to my digital workspace.

**Live at:** [siddharthb.me](https://siddharthb.me) (or [siddharth-bayapureddy.vercel.app](https://siddharth-bayapureddy.vercel.app))

![Portfolio Screenshot Placeholder](/public/preview.png)

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **UI/Styling**: TailwindCSS v4, Shadcn UI
- **Animations/3D**: Framer Motion, GSAP, React Three Fiber & Drei — Because static pages can be a bit boring, and we like a little bit of GPU flair.
- **Backend/DB**: Supabase

## Setup & Running

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Copy `.env.local.example` to `.env.local` and fill in your Supabase variables.
4. Start the development server:
   ```bash
   npm run dev
   ```

## Directory Structure

- `src/app`: Next.js App Router pages and layouts.
- `src/components`: Reusable UI components, separated neatly by domain.
- `src/lib`: Utilities, constants, and Supabase client configuration.
- `supabase`: Supabase related configurations and schema definitions.
- `public`: Static assets, images, and PDFs.

## Architecture

This portfolio uses server components where possible for better performance and SEO, falling back to client components only when interactivity (like GSAP or Three.js) is required. Data fetching is heavily integrated with Supabase.

## Easter Eggs

The site contains several interactive easter eggs to discover. Happy hunting:
- **The Void**: Rapidly click the 'SB' logo 5 times (homepage only).
- **Konami Code**: ↑ ↑ ↓ ↓ ← → ← → B A. You know what to do.
- **The Matrix**: Type 'matrix' anywhere on the screen.
- **The Sudoers File**: Type 'sudo' anywhere. (This incident will be reported).
- **Barrel Roll**: Type 'barrelroll' anywhere.
- **Chaos Mode**: Type 'chaos' anywhere.
- **Hold The Line**: Press and hold any Project Card for 1.5 seconds.
- **Light Mode**: Try switching to light mode. (Bring sunglasses).
- **The Truth**: Hover over the 'SB' logo for a bit.
- **Live Demo**: Hover over the external link icon on a project.
- **Self Written**: Click the copyright text in the footer.
- **The Bottom**: Scroll to the absolute bottom of the page and stare into the abyss.
- **Resume Warning**: Click the Resume link in the navbar.
