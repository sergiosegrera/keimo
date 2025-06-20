# boilerplate

A production-ready Next.js 15+ boilerplate with best practices for modern full-stack SaaS apps.

## Tech Stack
- **Framework:** Next.js App Router
- **Database:** Drizzle ORM + Neon PostgreSQL
- **UI:** shadcn/ui + Tailwind CSS
- **Auth:** Clerk
- **Background Jobs:** Inngest
- **Deployment:** Vercel

## Requirements
- [Colima](https://github.com/abiosoft/colima)
- [Docker](https://www.docker.com/)
- [pnpm](https://pnpm.io/)
- [Biome](https://biomejs.dev/)

## Project Structure
```
app/         # Next.js App Router
components/  # shadcn/ui components
core/        # Business logic (server functions)
db/          # Drizzle ORM & schema
types/       # Zod type definitions
lib/         # Utilities & API clients
```

## Getting Started
1. Clone the repository
```bash
git clone https://github.com/sergiosegrera/boilerplate.git
```

2. Run the set up script using the following command:
```bash
cd boilerplate
pnpm boilerplate
```

## Commands

```bash
pnpm boilerplate # Run the set up script

pnpm dev # Start the development server

pnpm build # Build the app
pnpm start # Start the app

pnpm shadcn [COMPONENT] # Add a new shadcn/ui component

pnpm db-start # Start the db
pnpm db-stop # Stop the db
pnpm db-psql # Open the psql shell

pnpm db-generate # Generate migrations
pnpm db-migrate # Run migrations
pnpm db-push # Push migrations
```

## TODO
- [ ] Add your own [favicon](https://realfavicongenerator.net/)
- [ ] Add your own metadata
- [ ] Add your own banner image (/public/banner.png)
- [ ] Add your own llms.txt
- [ ] Update the terms and privacy pages

## Docs
- [Next.js](https://nextjs.org/docs)
- [Drizzle ORM](https://orm.drizzle.team/docs)
- [shadcn/ui](https://ui.shadcn.com/)
- [Clerk](https://clerk.com/docs)
