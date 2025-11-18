# Ideabank Setup Instructions

## Database Setup

This project uses Prisma with PostgreSQL. Due to network restrictions in the current environment, the Prisma migration and generate commands could not be completed automatically.

### Steps to complete setup:

1. **Set up your PostgreSQL database**
   - Install PostgreSQL if not already installed
   - Create a new database for the project

2. **Configure environment variables**
   - Copy `.env.example` to `.env`
   - Update the `DATABASE_URL` with your actual database connection string:
     ```
     DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public"
     ```

3. **Run Prisma migrations**
   - In an environment with internet access, run:
     ```bash
     npx prisma migrate dev --name init
     ```
   - This will apply the migration found in `prisma/migrations/20241118002700_init/migration.sql`

4. **Generate Prisma Client**
   - Run:
     ```bash
     npx prisma generate
     ```
   - This will generate the Prisma Client based on your schema

### Alternatively, you can apply the migration manually:

If you prefer to apply the migration SQL directly to your database:

```bash
psql $DATABASE_URL -f prisma/migrations/20241118002700_init/migration.sql
npx prisma generate
```

### Verify your setup:

Once completed, you can verify your setup with:

```bash
npx prisma studio
```

This will open Prisma Studio where you can view and manage your database.

## Schema Overview

The database includes the following models:
- **User**: User accounts with roles (USER, MODERATOR, ADMIN)
- **Idea**: Business ideas with status tracking
- **IdeaAnalysis**: AI-generated analysis of ideas
- **TrendData**: Trend metrics from various platforms
- **BuildResource**: AI-generated resources (ads, landing pages, etc.)
- **Vote**: User votes on ideas
- **Comment**: Comments and replies on ideas

## Note about the environment

The Prisma CLI requires downloading binary engines from the internet. The current environment blocks access to `binaries.prisma.sh`, which is why the automatic migration failed. The migration SQL file has been created manually and can be applied when you have proper database access.
