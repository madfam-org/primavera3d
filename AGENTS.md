# Primavera3D Agent Operating Guide

> [!IMPORTANT]
> MADFAM-ENCLII-FIRST-LEGACY-RAW v1: This document contains legacy raw infrastructure command examples.
> Routine production operations must use Enclii web, API, or CLI. Treat raw
> `kubectl`, `helm`, SSH, provider CLI/API, `docker exec`, and direct container
> access as platform bootstrap or documented break-glass only, and record any
> missing Enclii adapter gap.

<!-- MADFAM-AGENTS-CANONICAL v1 -->

This is the canonical instruction file for Claude, Codex, and any other LLM
agent working in this repository. `CLAUDE.md` is kept only as a compatibility
redirect and should not become the source of truth again.

## Required operating doctrine

- Read this file before making repo changes.
- Prefer existing repo conventions, scripts, and docs over introducing new
  patterns.
- Preserve user work and never revert unrelated changes.
- Treat production operations as Enclii-first: use Enclii web, API, or CLI for
  provisioning, deployment, observability, domains, secrets, provider
  operations, scaling, rollback, and remediation.
- Use direct `kubectl`, `helm`, SSH, provider CLIs/APIs, `docker exec`, or
  direct container access only for platform bootstrap or documented break-glass
  emergencies when Enclii is unavailable or lacks an implemented adapter.
- Record any missing Enclii adapter gap instead of normalizing raw production
  access in docs or runbooks.

## Repo entrypoints

- `README.md`
- `ECOSYSTEM.md`
- `docs/`
- `infra/`
- `.github/workflows/`

## LLM context files

- `llms.txt` is the compact context index.
- `llms-full.txt` is the durable full-context map and operating contract.
- `AGENTS.md` is canonical for agent instructions.
- `CLAUDE.md` redirects here for Claude compatibility.

## Maintenance

Regenerate or repair these files with
`internal-devops/scripts/sync-agent-docs.py` from the labspace ecosystem.

---

## Legacy CLAUDE.md guidance imported on 2026-05-13

<!-- BEGIN LEGACY_CLAUDE_IMPORT -->

# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Primavera3D is a high-performance portfolio website for 3D modeling, parametric design, and digital fabrication services. Part of the MADFAM ecosystem with solarpunk ethos, targeting 200% increase in qualified leads.

## Development Commands

### Initial Setup (When Implementation Begins)

```bash
# Create turborepo monorepo structure
npx create-turbo@latest

# Install dependencies
npm install

# Development server
npm run dev

# Production build
npm run build

# Run tests
npm run test

# Lint and format
npm run lint
npm run format

# Type checking
npm run typecheck
```

## Architecture & Structure

### Monorepo Organization (Turborepo)

```
apps/
  web/                 # Main Next.js 14 application
    app/              # App router pages
    components/       # Page-specific components
    lib/              # Business logic
    public/           # Static assets

packages/
  ui/                 # Shared UI components (shadcn/ui + Radix)
  viewer-3d/          # React Three Fiber 3D viewer
  config/             # Shared configurations
  utils/              # Shared utilities
```

### Core Technologies

- **Framework**: Next.js 14 with App Router, TypeScript 5
- **3D Rendering**: Three.js, React Three Fiber, @react-three/drei
- **Styling**: Tailwind CSS with "Blueprint Aesthetic" design system
- **CMS**: Sanity.io for content management
- **Database**: PostgreSQL with Prisma ORM
- **Media**: Cloudinary (images), Mux (videos), AWS S3 (3D models)

### Key Design System Values

**Blueprint Aesthetic Theme**:

- Primary: `#2563EB` (Blueprint Blue)
- Grid pattern overlays for technical feel
- Monospace fonts for technical elements
- High contrast with dark backgrounds

**Performance Targets**:

- LCP ≤ 2.5s
- INP ≤ 200ms
- CLS ≤ 0.10
- Bundle size < 300KB initial

## Critical Implementation Guidelines

### 3D Viewer Component

The 3D viewer is the core feature. Implementation requirements:

- Lazy load with React.lazy()
- Progressive enhancement (2D fallback)
- Support GLTF, OBJ, STL, STEP formats
- Touch gestures and AR mode support
- Optimize with LODs and texture compression

### API Routes Pattern

```typescript
// app/api/[resource]/route.ts
export async function GET/POST/PUT/DELETE(request: Request) {
  // Rate limiting with Upstash
  // Validate with Zod schemas
  // Return NextResponse.json()
}
```

### Database Schema Priorities

1. Projects (title, slug, images, models, tech_stack)
2. Categories (name, slug, description)
3. Testimonials (author, content, rating)
4. Contact submissions

### Sanity.io Integration

- Use GROQ queries for content fetching
- Implement webhook revalidation
- Type generation with `sanity typegen`

## Performance Optimization Checklist

- [ ] Implement dynamic imports for 3D components
- [ ] Use Next.js Image with blur placeholders
- [ ] Enable ISR for portfolio pages
- [ ] Implement proper caching headers
- [ ] Use Suspense boundaries for async components
- [ ] Optimize 3D models (draco compression, texture atlases)

## Testing Strategy

```bash
# Unit tests (Vitest)
npm run test:unit

# Integration tests
npm run test:integration

# E2E tests (Playwright)
npm run test:e2e

# 3D component tests
npm run test:3d
```

## Deployment Workflow

1. Push to feature branch
2. Vercel preview deployment
3. Run Lighthouse CI checks
4. Merge to main for production
5. Monitor with Sentry and Analytics

## Project-Specific Context

**Business Goals**:

- Showcase 3D modeling expertise
- Generate qualified leads for custom projects
- Support bilingual content (en-US, es-MX)

**Target Audience**:

- Architects and designers
- Manufacturing companies
- Educational institutions
- Maker community

**Key Pages to Implement**:

1. `/` - Hero with 3D showcase
2. `/portfolio` - Filterable project grid
3. `/portfolio/[slug]` - Project detail with 3D viewer
4. `/services` - Service offerings
5. `/contact` - Multi-step contact form

## Security Considerations

- Implement CSP headers for 3D content
- Sanitize user uploads for 3D models
- Rate limit API endpoints
- Use signed URLs for S3 assets
- Validate all form inputs with Zod

## References

- Full specifications: `SOFTWARE_APEC.md`
- Design system: `docs/VISUAL_DESIGN_SYSTEM.md`
- Project overview: `README.md`

<!-- END LEGACY_CLAUDE_IMPORT -->
