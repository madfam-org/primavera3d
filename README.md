# Primavera3D

> High-performance portfolio and services platform for 3D modeling, parametric design, and digital fabrication. Part of the MADFAM ecosystem.

[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8)](https://tailwindcss.com/)
[![Three.js](https://img.shields.io/badge/Three.js-r160-000000)](https://threejs.org/)

---

## Overview

Primavera3D showcases professional 3D modeling and digital fabrication services with an immersive, interactive experience. The platform features:

- **Interactive 3D Portfolio** - Browse projects with real-time 3D model viewing
- **Instant Quoting** - Integrated Cotiza quote calculator for manufacturing services
- **Service Showcase** - Detailed service pages for modeling, scanning, and fabrication
- **Contact & Lead Generation** - Streamlined inquiry forms with CRM integration

## Tech Stack

| Category     | Technology                                           |
| ------------ | ---------------------------------------------------- |
| Framework    | Next.js 14 (App Router)                              |
| Language     | TypeScript 5                                         |
| 3D Rendering | Three.js, React Three Fiber, @react-three/drei       |
| Styling      | Tailwind CSS with Blueprint Aesthetic design system  |
| CMS          | Sanity.io                                            |
| Database     | PostgreSQL with Prisma ORM                           |
| Media        | Cloudinary (images), Mux (video), AWS S3 (3D models) |
| Deployment   | MADFAM k3s (bare-metal Hetzner) — GHCR images + Argo CD, Enclii platform |

## Project Structure

```
primavera3d/
├── apps/
│   └── web/                    # Main Next.js application
│       ├── app/
│       │   ├── about/          # About page
│       │   ├── contact/        # Contact form
│       │   ├── orders/         # Order tracking
│       │   ├── portfolio/      # Project portfolio
│       │   ├── quote/          # Cotiza quote calculator embed
│       │   ├── services/       # Service pages
│       │   └── api/            # API routes
│       ├── components/         # React components
│       └── lib/                # Utilities and business logic
├── packages/
│   ├── ui/                     # Shared UI components
│   ├── viewer-3d/              # 3D viewer component library
│   └── config/                 # Shared configurations
└── docs/                       # Documentation
```

## Quick Start

### Prerequisites

- Node.js 18+
- pnpm 8+

### Installation

```bash
# Clone the repository
git clone https://github.com/madfam/primavera3d.git
cd primavera3d

# Install dependencies
pnpm install

# Copy environment variables
cp apps/web/.env.example apps/web/.env.local

# Start development server
pnpm dev
```

### Environment Variables

```bash
# Database
DATABASE_URL="postgresql://..."

# Sanity CMS
NEXT_PUBLIC_SANITY_PROJECT_ID="..."
NEXT_PUBLIC_SANITY_DATASET="production"
SANITY_API_TOKEN="..."

# Media Services
CLOUDINARY_URL="..."
MUX_TOKEN_ID="..."
MUX_TOKEN_SECRET="..."

# AWS S3 (3D Models)
AWS_ACCESS_KEY_ID="..."
AWS_SECRET_ACCESS_KEY="..."
AWS_S3_BUCKET="..."

# Cotiza Integration
NEXT_PUBLIC_COTIZA_EMBED_URL="..."
```

## Key Features

### 3D Model Viewer

The portfolio features an interactive 3D viewer supporting multiple formats:

- **GLTF/GLB** - Optimized web delivery
- **OBJ** - Legacy support
- **STL** - 3D printing preview
- **STEP** - CAD visualization

```tsx
import { ModelViewer } from '@primavera3d/viewer-3d';

<ModelViewer
  src="/models/project.glb"
  autoRotate
  enableAR
  fallback={<Image src="/preview.jpg" />}
/>;
```

### Quote Calculator Integration

Primavera3D embeds the real Cotiza quote calculator for instant manufacturing quotes:

```tsx
// app/quote/page.tsx
<CotizaEmbed tenant="primavera3d" services={['3d-printing', 'cnc', 'laser-cutting']} />
```

### Blueprint Aesthetic Design System

The visual design follows a technical "blueprint" theme:

- **Primary Color**: `#2563EB` (Blueprint Blue)
- **Grid Overlays**: Technical drawing aesthetic
- **Typography**: Monospace for technical elements
- **High Contrast**: Dark backgrounds with bright accents

## Development

### Commands

```bash
# Development
pnpm dev              # Start dev server (port 3000)
pnpm build            # Production build
pnpm start            # Start production server

# Quality
pnpm lint             # Run ESLint
pnpm format           # Format with Prettier
pnpm typecheck        # TypeScript type checking
pnpm test             # Run tests

# Database
pnpm db:push          # Push schema to database
pnpm db:studio        # Open Prisma Studio
pnpm db:migrate       # Run migrations
```

### Performance Targets

| Metric         | Target  |
| -------------- | ------- |
| LCP            | ≤ 2.5s  |
| INP            | ≤ 200ms |
| CLS            | ≤ 0.10  |
| Initial Bundle | < 300KB |

## Pages

| Route               | Description                           |
| ------------------- | ------------------------------------- |
| `/`                 | Homepage with hero, featured projects |
| `/portfolio`        | Full project gallery with 3D previews |
| `/portfolio/[slug]` | Individual project detail page        |
| `/services`         | Service offerings overview            |
| `/services/[slug]`  | Individual service detail             |
| `/quote`            | Integrated Cotiza quote calculator    |
| `/orders`           | Order tracking for customers          |
| `/about`            | Company and team information          |
| `/contact`          | Contact form and information          |

## MADFAM Ecosystem Integration

Primavera3D integrates with other MADFAM platforms:

- **Cotiza** - Real-time manufacturing quotes embedded at `/quote`
- **Sim4D** - Parametric design viewer for complex projects
- **Blueprint Harvester** - 3D asset management and discovery

## Deployment

### Current status (2026-07-04)

Primavera3D deploys to **MADFAM's bare-metal k3s cluster (Hetzner)**, not
Vercel. This is what the repository's own manifests and workflows implement:

- `.github/workflows/build-deploy.yml` builds the web image from
  `apps/web/Dockerfile`, pushes it to `ghcr.io/madfam-org/primavera3d/web`,
  and pins the digest via kustomize.
- Kubernetes manifests live in `infra/k8s/production/` (namespace
  `primavera3d`: deployment, service, network policies, kustomization).
- Argo CD reconciles the manifests (`infra/argocd/config.json`, tracking
  `main` at `infra/k8s/production`).
- Day-to-day operations go through **Enclii** (see
  [ECOSYSTEM.md](./ECOSYSTEM.md)).

> **Historical note:** earlier versions of this README recommended Vercel CLI
> deployment. That path was never wired into this repo's CI (there is no
> `vercel.json`) and is retained here only as history — do not deploy to
> Vercel.

### Docker (local)

```bash
docker build -f apps/web/Dockerfile -t primavera3d .
docker run -p 3000:3000 primavera3d
```

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for development guidelines.

## Documentation

- [Visual Design System](./docs/VISUAL_DESIGN_SYSTEM.md)
- [Architecture Overview](./docs/architecture/)
- [API Reference](./docs/API.md)

## License

Proprietary - MADFAM LLC. All rights reserved.

---

**Part of the MADFAM Ecosystem** | [Cotiza](https://github.com/madfam/digifab-quoting) | [Sim4D](https://github.com/madfam/sim4d) | [Blueprint Harvester](https://github.com/madfam/blueprint-harvester)
