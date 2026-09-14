// eslint.config.mjs — ESLint 9 flat config for Next 15
//
// WHY THIS SHAPE, 2026-09-13
// --------------------------
// The previous version did:
//
//   import nextVitals from "eslint-config-next/core-web-vitals";
//   import nextTs     from "eslint-config-next/typescript";
//   defineConfig([...nextVitals, ...nextTs, ...])
//
// and could not resolve, so `npm run lint` threw before linting a single file.
// TWO separate problems, both reproduced against the installed
// eslint-config-next@15.3.2:
//
//   1. RESOLUTION. That package ships NO `exports` map — just plain CJS files
//      (core-web-vitals.js, typescript.js, index.js, parser.js) at the package
//      root. In ESM a bare extensionless subpath is only resolvable through an
//      `exports` map, so the import threw:
//          ERR_MODULE_NOT_FOUND … 'eslint-config-next/core-web-vitals'
//      Adding `.js` fixes the resolution.
//
//   2. SHAPE — and this is why the `.js` fix alone is NOT sufficient. With the
//      extension the import succeeds, but the value is a LEGACY ESLINTRC OBJECT:
//          { extends: [...] }
//      not a flat-config array. Spreading a non-iterable object throws again.
//      Verified 2026-09-13 against node_modules:
//          require('eslint-config-next/package.json').exports  === undefined
//          Array.isArray(require('eslint-config-next/core-web-vitals.js')) === false
//          Object.keys(...)                                    === ['extends']
//
// So the correct bridge for eslint-config-next 15.x under ESLint 9 is
// FlatCompat, which translates the eslintrc shape into flat config. This is the
// pattern create-next-app emits for ESLint 9 projects.
//
// If eslint-config-next later ships native flat config (an `exports` map plus
// array exports), this can return to plain imports — check the installed
// package's package.json for an `exports` key before changing it.
//
// NOTE: requires @eslint/eslintrc as a devDependency.

import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({ baseDirectory: __dirname });

const eslintConfig = [
  {
    ignores: [".next/**", "out/**", "build/**", "next-env.d.ts", "node_modules/**"],
  },
  ...compat.extends("next/core-web-vitals", "next/typescript"),
];

export default eslintConfig;
