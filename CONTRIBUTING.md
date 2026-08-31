# Contributing to Primavera3D

## Development Workflow

### Getting Started

1. **Clone the repository**

   ```bash
   git clone https://github.com/primavera3d/website.git
   cd website
   ```

2. **Run automated setup**

   ```bash
   npm run setup
   ```

   This will:
   - Check Node.js version
   - Install dependencies
   - Set up environment variables
   - Configure git hooks
   - Build all packages

3. **Start development**
   ```bash
   npm run dev
   ```

### Code Style

We use automated tools to maintain code quality:

- **ESLint** for code linting
- **Prettier** for formatting
- **TypeScript** for type safety
- **Husky** for git hooks

All these run automatically on commit. To run manually:

```bash
npm run lint
npm run format
npm run check-types
```

### Commit Convention

We follow [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code style changes (formatting)
- `refactor:` Code refactoring
- `perf:` Performance improvements
- `test:` Test additions/changes
- `chore:` Maintenance tasks
- `ci:` CI/CD changes
- `build:` Build system changes

Examples:

```bash
git commit -m "feat: add 3D model loading indicator"
git commit -m "fix: resolve hydration error in portfolio grid"
git commit -m "docs: update API documentation"
```

### Testing

Write tests for new features and bug fixes:

```bash
# Unit tests
npm run test

# Test coverage
npm run test:coverage

# E2E tests
npm run test:e2e
```

### Pull Request Process

1. Create a feature branch from `develop`

   ```bash
   git checkout -b feat/your-feature-name
   ```

2. Make your changes and commit them

3. Push to your fork/branch

   ```bash
   git push origin feat/your-feature-name
   ```

4. Create a Pull Request to `develop` branch

5. Ensure all checks pass:
   - Build succeeds
   - Tests pass
   - Linting passes
   - Type checking passes

6. Request review from team members

### Package Structure

When adding new shared code:

- **UI Components** → `packages/ui`
- **3D Components** → `packages/viewer-3d`
- **Utilities** → `packages/utils`
- **Type Definitions** → `packages/types`

### Performance Guidelines

- Keep bundle sizes minimal
- Lazy load heavy components
- Optimize images with Next.js Image
- Use dynamic imports for 3D content
- Monitor Core Web Vitals

### Accessibility

- Maintain WCAG 2.2 AA compliance
- Test with keyboard navigation
- Include proper ARIA labels
- Ensure color contrast ratios

### Security

- Never commit secrets or API keys
- Use environment variables
- Sanitize user inputs
- Keep dependencies updated

## Questions?

Open an issue or reach out to the Primavera3D team.
