// Augments Vitest's `expect` with jest-dom matchers (toBeInTheDocument,
// toHaveClass, toBeDisabled, toHaveAttribute, ...) so that `tsc --noEmit`
// on this app recognizes them in the co-located component tests.
import '@testing-library/jest-dom/vitest';
