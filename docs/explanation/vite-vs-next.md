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
- Anything else React (Vite SPA, library, Remix-etc.) → `vite`.
- Unsure or plain TypeScript → `recommended` (Vite-light, no
  framework-specific rules) or `typescript`.

Both presets extend the same `react` foundation, so switching later is
a one-line import change.
