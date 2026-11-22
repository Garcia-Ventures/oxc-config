# Explanation: Vite vs Next

> Why two framework presets instead of one React preset?

## Different runtimes, different rules

Vite and Next.js share React but diverge everywhere else:

- **Vite** projects run in the browser (or Node for tooling) and test
  with Vitest. The `vite` preset adds the `vitest` plugin, Vitest test
  overrides, and ignores for `dist/` and Playwright output.
- **Next.js** projects have framework-specific correctness rules
  (routing, images, links) implemented by the `nextjs` plugin, plus
  build output (`.next/`, `out/`) that must be ignored. The `next`
  preset wires all of that up.

A single preset would force Next.js rules onto Vite apps (false
positives) or Vitest globals onto Next.js apps (noise).

## Decision rule

- Next.js app (App or Pages Router) → `next`.
- Expo or React Native → `expo`.
- Anything else React (Vite SPA, Remix-etc.) → `vite`.
- Node service or CLI → `node`.
- TypeScript library, or you are unsure → `recommended` (`library`).

`vite`, `next`, and `expo` share the same React foundation. Switching
later is a one-line change to the object passed to `defineConfig`.
