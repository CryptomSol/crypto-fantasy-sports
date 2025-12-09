# Crypto Fantasy League

A Farcaster Mini App for daily fantasy sports with crypto integration. Draft memecoins, traders, and athletes for crypto events and real sports. Compete in daily fantasy leagues with USDC entry fees, big prize pools, and live leaderboards.

## Overview

Crypto Fantasy League is a web-based mini application built for the Farcaster ecosystem. It runs seamlessly within Farcaster clients (such as Warpcast) on both mobile and desktop platforms, providing users with an engaging fantasy sports experience that combines traditional sports with cryptocurrency markets.

## Features

- 🎮 **Daily Fantasy Leagues** - Compete in daily fantasy competitions
- 💰 **Crypto Integration** - USDC entry fees and prize pools
- 📊 **Live Leaderboards** - Real-time competition tracking
- 🎯 **Multi-Asset Drafting** - Draft memecoins, traders, and athletes
- 📱 **Cross-Platform** - Works on iOS, Android, and Web via Farcaster clients
- 🎨 **Modern UI** - Built with shadcn/ui and Tailwind CSS

## Tech Stack

### Frontend
- **Framework**: Next.js 15.5.4
- **React**: 19.2.0
- **TypeScript**: 5.x
- **Styling**: Tailwind CSS 4.x
- **UI Components**: shadcn/ui (Radix UI primitives)
- **Form Handling**: React Hook Form + Zod validation

### Platform Integration
- **Farcaster SDK**: `@farcaster/miniapp-sdk` v0.1.10
- **Deployment**: Xnode (OpenxAI infrastructure)
- **Build System**: Nix Flakes

## Prerequisites

- Node.js 18+ (or Bun)
- npm, yarn, or pnpm
- Git
- Nix (for Nix-based builds, optional)

## Getting Started

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd daily-fantasy-sports
   ```

2. **Install dependencies**
   ```bash
   cd mini-app
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the `mini-app` directory:
   ```env
   NEXT_PUBLIC_URL=https://your-domain.com
   ACCOUNT_ASSOCIATION={"header":"","payload":"","signature":""}
   BASE_BUILDER={"allowedAddresses":[]}
   ```

### Development

**From the root directory (Nix build):**
```bash
nix run
```

**From the mini-app directory:**
```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Run linter
npm run lint
```

The development server will start at `http://localhost:3000`.

## Project Structure

```
daily-fantasy-sports/
├── mini-app/                 # Next.js application
│   ├── app/                  # Next.js app directory
│   │   ├── layout.tsx        # Root layout
│   │   ├── page.tsx          # Home page
│   │   └── .well-known/      # Farcaster manifest routes
│   ├── components/           # React components
│   │   ├── ui/               # shadcn/ui components
│   │   └── context/          # React context providers
│   ├── lib/                  # Utility functions and configs
│   └── public/               # Static assets
├── documentation/            # Project documentation
├── nix/                      # Nix package definitions
└── flake.nix                 # Nix flake configuration
```

## Farcaster Integration

This app is configured as a Farcaster Mini App, which means:

- It can be discovered and launched within Farcaster clients
- Users can authenticate using their Farcaster identity
- The app can send notifications to users
- Pages can be shared as rich cards in Farcaster feeds

The Farcaster manifest is served at `/.well-known/farcaster.json` and includes app metadata, icons, and configuration.

## Deployment

This project is configured for deployment on Xnode (OpenxAI's infrastructure). The Nix-based build system ensures reproducible builds across different environments.

### Build for Production

```bash
# Using Nix
nix build

# Using npm
cd mini-app
npm run build
```

## Development Guidelines

- All component files should start with `"use client";` directive
- Use existing shadcn/ui components when possible
- Follow TypeScript best practices with explicit type annotations
- Maintain the Farcaster metadata export on the home page
- Use Tailwind CSS for styling (configured in `globals.css`)

## Contributing

Contributions are welcome! Please ensure that:

1. Code follows the existing style and conventions
2. All components include proper TypeScript types
3. The Farcaster manifest remains properly configured
4. UI components maintain consistency with the design system

## Contact

For questions, suggestions, or collaboration opportunities:

- **Telegram**: [@tomharvey1128](https://t.me/tomharvey1128)
- **X (Twitter)**: [@tomharvey1128](https://x.com/tomharvey1128)

## License

See [LICENSE](LICENSE) file for details.

## Acknowledgments

- Built using the [OpenxAI Mini App Factory](https://miniapp-factory.marketplace.openxai.network) template
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Powered by [Farcaster](https://farcaster.xyz/) and [Xnode](https://xnode.network/)

---

For more information about Farcaster Mini Apps, see the [documentation](./documentation/farcaster.md).
