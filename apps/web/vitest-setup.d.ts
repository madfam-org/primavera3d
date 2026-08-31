// Registers @testing-library/jest-dom's custom matchers (toBeInTheDocument,
// toHaveClass, toBeDisabled, toHaveAttribute, ...) on Vitest's Assertion type
// so the matchers used in __tests__/*.test.tsx type-check. The matchers are
// wired at runtime in the root test/setup.ts (vitest setupFiles).
import '@testing-library/jest-dom/vitest';
