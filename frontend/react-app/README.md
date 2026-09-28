# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is enabled on this template. See [this documentation](https://react.dev/learn/react-compiler) for more information.

Note: This will impact Vite dev & build performances.
You can also try [the experimental native React Compiler support in plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md#rust-react-compiler) by using `compiler: true` in the plugin options instead of using the Babel plugin.

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  # React Frontend

  This is the Vite/React app included with the API template. For full repository setup and production instructions, see the root [README](../../README.md).

  Run from this directory:

  | Command | Purpose |
  | --- | --- |
  | `npm run dev` | Start Vite with hot reload |
  | `npm run build` | Type-check and build to `dist/` |
  | `npm run lint` | Run ESLint |
  | `npm run preview` | Preview the production build locally |

  The Vite proxy in `vite.config.ts` forwards `/health` to the backend at `http://localhost:3000`. Update it if the API port or route prefixes change. The backend serves this app's `dist/` folder after a production build.
    ],
