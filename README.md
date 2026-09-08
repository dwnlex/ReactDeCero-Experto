# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])

```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])

```

## Despliegue

Este proyecto se publica en **GitHub Pages** mediante **GitHub Actions**:
`https://dwnlex.github.io/ReactDeCero-Experto/`

### Por qué GitHub Actions y no "Deploy from a branch"

"Deploy from a branch" sirve los archivos de la rama **tal cual, sin compilar**. Este
proyecto es TypeScript + JSX: publicaba `src/main.tsx` sin transpilar y el navegador
no sabe ejecutar `.tsx` → **página en blanco**. En local `pnpm run dev` funciona
porque Vite transpila al vuelo, lo que esconde el problema.

Con GitHub Actions el sitio se **compila en CI** (`vite build`) y se publica la
carpeta `dist/` ya lista para el navegador (HTML + JS/CSS compilados y minificados).

En el repo esto se configura en **Settings → Pages → Source → GitHub Actions**.

### Cómo funciona el workflow

Archivo: `.github/workflows/deploy.yml`. Se dispara en cada `push` a `main` (y a mano
con "Run workflow", gracias a `workflow_dispatch`).

Job `build`:

1. `actions/checkout@v4` — clona el repo.
2. `pnpm/action-setup@v4` (`version: 9`) — instala pnpm (coincide con `lockfileVersion: 9.0`).
3. `actions/setup-node@v4` — Node 22 + `cache: 'pnpm'` (acelera instalaciones sucesivas).
4. `pnpm install --frozen-lockfile` — instala exactamente lo que fija `pnpm-lock.yaml`;
   falla si el lockfile está desincronizado en vez de mutarlo.
5. `pnpm run build` — ejecuta `tsc -b && vite build`. Un error de tipos **rompe el deploy**.
6. `actions/upload-pages-artifact@v3` con `path: ./dist` — empaqueta `dist/` como artifact.

Job `deploy` (`needs: build`, entorno `github-pages`):

7. `actions/deploy-pages@v4` — publica el artifact en GitHub Pages.

`permissions` mínimos: `contents: read`, `pages: write`, `id-token: write`.
`concurrency: { group: "pages", cancel-in-progress: false }` — si llegan dos pushes
seguidos no se aborta un deploy de producción a medias.

### El rol de `base` en `vite.config.ts`

```ts
export default defineConfig({
  base: '/ReactDeCero-Experto/',
  // ...
})
```

Pages sirve el sitio en un **subdirectorio** (`/ReactDeCero-Experto/`), no en la raíz
del dominio. `base` hace que Vite prefije todas las URLs de assets con ese subpath:

- Sin `base`: el HTML pide `/assets/index-xxxx.js` → GitHub responde 404 → página en blanco.
- Con `base`: pide `/ReactDeCero-Experto/assets/index-xxxx.js` → 200.

Reglas:

- El valor debe coincidir **exacto** con el nombre del repo, **respetando mayúsculas**
  (`ReactDeCero-Experto`, no `reactdecero-experto`).
- Con `/` al principio y al final: `/ReactDeCero-Experto/`.
- En local con `pnpm run dev` da igual (Vite sirve desde `/`); solo importa en el build.
  Para probar el build real: `pnpm run preview` y abre
  `http://localhost:4173/ReactDeCero-Experto/`.

### Checklist: la página publicada sale en blanco

1. **DevTools → Console / Network.** ¿Hay 404 de archivos `.js` o `.css`?
   → casi siempre `base` mal escrito o distinto al nombre del repo.
2. **`base` en `vite.config.ts`** == `/ReactDeCero-Experto/` (barra inicial y final,
   mismas mayúsculas que el repo).
3. **Settings → Pages → Source** == *GitHub Actions* (no "Deploy from a branch").
4. **Pestaña Actions.** ¿El run "Deploy to GitHub Pages" terminó en verde, jobs
   `build` **y** `deploy`?
5. **Qué se publicó.** El workflow sube `dist/` (`path: ./dist` en
   `upload-pages-artifact`), no la raíz del repo.
6. **Caché.** Hard refresh con `Ctrl+Shift+R` (navegador y CDN de Pages tardan en refrescar).
7. **La URL.** Entra con la barra final: `https://dwnlex.github.io/ReactDeCero-Experto/`.
8. **Reproducir en local.** `pnpm run build && pnpm run preview`, abre
   `http://localhost:4173/ReactDeCero-Experto/`. Si también falla ahí, el problema
   está en el código/config, no en Pages.
9. **Opcional: smoke test en CI.** Añade un paso tras `build` que levante
   `vite preview` y verifique con `curl` que el HTML trae `<div id="root">` y que
   referencia `assets/index-*.js` con el prefijo `/ReactDeCero-Experto/`; si falla,
   el deploy se detiene antes de publicar.
