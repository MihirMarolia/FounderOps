# IdeaBank - Startup Idea Platform

An open-source platform for discovering, sharing, and analyzing startup ideas with AI-powered insights, similar to ideabrowser.com.

## Features

- **Browse Ideas**: Explore startup ideas with advanced filtering by category, market type, and popularity
- **AI-Powered Analysis**: Get instant market analysis, execution plans, and insights powered by Claude AI
- **Trend Tracking**: Real-time trend data from Reddit, YouTube, and other platforms
- **Build Resources**: AI-generated landing pages, ad creatives, brand packages, and business plans
- **Community Engagement**: Vote and comment on ideas
- **Admin Workflow**: Approval system for idea moderation
- **User Authentication**: Secure authentication with NextAuth.js

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: PostgreSQL with Prisma ORM
- **AI**: Anthropic Claude API
- **Authentication**: NextAuth.js
- **UI Components**: Radix UI

## Project Structure

```
/app                    # Next.js pages and routes
/components
  /ui                   # Reusable UI components (Button, Card, Badge, etc.)
  /ideas                # Idea-specific components (IdeaCard, etc.)
  /layout               # Layout components (Header, Footer, etc.)
/lib
  /db                   # Database client and utilities
  /ai                   # AI/Claude integration
  /utils                # Utility functions
/prisma                 # Database schema
/types                  # TypeScript type definitions
```

## Database Models

- **User**: User accounts with role-based access (USER, MODERATOR, ADMIN)
- **Idea**: Startup ideas with metadata, status, and categorization
- **IdeaAnalysis**: AI-generated analysis (Why Now, Proof Signals, Market Gap, Execution Plan)
- **TrendData**: Platform-specific trend metrics
- **BuildResource**: AI-generated resources (Ad Creatives, Brand Package, Landing Page, etc.)
- **Vote**: User voting system
- **Comment**: Threaded comments with replies

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database
- Anthropic API key

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd ideabank
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

Edit `.env` and add your configuration:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/ideabank?schema=public"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key"
ANTHROPIC_API_KEY="your-anthropic-api-key"
```

4. Set up the database:
```bash
# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma migrate dev

# (Optional) Seed the database
npx prisma db seed
```

5. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npx prisma studio` - Open Prisma Studio (database GUI)
- `npx prisma migrate dev` - Create and apply migrations

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_URL` | PostgreSQL connection string | Yes |
| `NEXTAUTH_URL` | Application URL | Yes |
| `NEXTAUTH_SECRET` | NextAuth secret key | Yes |
| `ANTHROPIC_API_KEY` | Anthropic Claude API key | Yes |
| `GOOGLE_CLIENT_ID` | Google OAuth client ID | No |
| `GOOGLE_CLIENT_SECRET` | Google OAuth secret | No |
| `GITHUB_ID` | GitHub OAuth app ID | No |
| `GITHUB_SECRET` | GitHub OAuth secret | No |

## Development Roadmap

- [x] Project setup and structure
- [x] Database schema with Prisma
- [x] Basic UI components
- [x] Home page with featured ideas
- [ ] NextAuth.js authentication
- [ ] Idea submission form
- [ ] Idea detail page with AI analysis
- [ ] AI integration for idea analysis
- [ ] AI resource generation
- [ ] Voting system
- [ ] Comment system
- [ ] Search and filtering
- [ ] Admin panel
- [ ] User profiles
- [ ] Trend tracking integration

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the MIT License.

## Acknowledgments

- Inspired by [ideabrowser.com](https://ideabrowser.com)
- Built with [Next.js](https://nextjs.org)
- AI powered by [Anthropic Claude](https://anthropic.com)
