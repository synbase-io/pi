# Synbase Pi packages

This pnpm workspace contains Pi packages published under `@synbase.io`.

## Extension package convention

Each extension-bearing workspace package exposes **one** Pi extension at its package root:

```text
package/
├── index.js                 # exports only the compiled default factory
├── src/
│   ├── extension.ts         # composes and registers package features
│   └── index.ts             # shared public API
└── dist/
    ├── extension.js
    └── index.js
```

- `index.js` must contain only `export { default } from "./dist/extension.js";`.
- Set `pi.extensions` to `["./index.js"]` and include both `index.js` and `dist` in the package's `files` list.
- Compile `src/extension.ts` to `dist/extension.js`; keep the composed default Pi factory and all feature registration in TypeScript. Await each asynchronous feature registration in that factory.
- Preserve `src/index.ts` → `dist/index.js` for APIs used by other workspace packages, with `exports["."]` pointing to `./dist/index.js`.
- Configure tsup to write and clean only `dist`; never emit into or clean the package root.

Internal feature modules are composed by the package factory rather than listed independently in `pi.extensions`. Consequently, they share one Pi loading and error boundary and one enable/disable identity: the package name (for example, `@synbase.io/pi-core`).
