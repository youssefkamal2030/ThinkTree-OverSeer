# Full-Stack Next.js + Convex Application

A modern full-stack application built with Next.js 16, Convex, and deployed on Vercel.

## Tech Stack

- **Frontend**: Next.js 16 with React 19
- **Backend**: Convex (real-time database and backend)
- **Styling**: Tailwind CSS
- **Deployment**: Vercel
- **Language**: TypeScript

## Getting Started

### Prerequisites

- Node.js 20+ installed
- npm or yarn package manager

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Set up Convex:

```bash
npx convex dev
```

This will:
- Create a new Convex project (or link to existing)
- Generate your `.env.local` file with Convex credentials
- Start the Convex development server

4. In a separate terminal, start the Next.js development server:

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Environment Variables

Copy `.env.local.example` to `.env.local` and fill in your values:

```bash
cp .env.local.example .env.local
```

Required variables:
- `CONVEX_DEPLOYMENT` - Your Convex deployment name
- `NEXT_PUBLIC_CONVEX_URL` - Your Convex deployment URL

## Project Structure

```
├── app/                  # Next.js app directory
│   ├── layout.tsx       # Root layout with Convex provider
│   └── page.tsx         # Home page
├── convex/              # Convex backend
│   ├── schema.ts        # Database schema
│   ├── tasks.ts         # Example queries and mutations
│   └── tsconfig.json    # Convex TypeScript config
├── lib/                 # Shared utilities
│   └── convex.tsx       # Convex client provider
└── public/              # Static assets
```

## Available Scripts

- `npm run dev` - Start Next.js development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run convex:dev` - Start Convex development server
- `npm run convex:deploy` - Deploy Convex to production

## Deployment

### Vercel Deployment

1. Push your code to GitHub
2. Import your repository in Vercel
3. Add environment variables in Vercel dashboard:
   - `CONVEX_DEPLOYMENT`
   - `NEXT_PUBLIC_CONVEX_URL`
4. Deploy!

### Convex Deployment

Deploy your Convex backend:

```bash
npm run convex:deploy
```

This will give you production Convex URLs to use in your Vercel environment variables.

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Convex Documentation](https://docs.convex.dev)
- [Vercel Documentation](https://vercel.com/docs)

## License

MIT
