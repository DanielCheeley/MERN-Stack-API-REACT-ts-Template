# MERN Stack API React TypeScript Template

A TypeScript Express API and React/Vite frontend starter. The API includes a health route, request logging, error middleware, optional MongoDB connection, and graceful database shutdown. The frontend currently demonstrates calling the API health route.

## Requirements

- Node.js 20.11 or newer
- npm
- MongoDB is optional until your application needs persistence

## Project Structure

```text
backend/
	src/controllers/     Express request handlers
	src/middleware/      Logging, validation, and error handling
	src/routes/          Express route definitions
	src/schemas/         Zod request schemas
	src/types/           Example database types
	src/db.ts            MongoDB connection and collection helpers
	src/index.ts         Express app, middleware, routes, and startup
	.env.example         Backend environment variable template
frontend/react-app/
	src/                 React application
	vite.config.ts       Vite dev server and API proxy
```

## Setup

Install dependencies in each application directory:

```powershell
cd backend
npm install
Copy-Item .env.example .env
cd ..\frontend\react-app
npm install
```

Edit `backend/.env` for local backend settings. The API runs without MongoDB. To enable it, uncomment and set both `MONGO_URI` and `DB_NAME` in `.env`. If a MongoDB password contains reserved URL characters such as `@`, `:`, `/`, or `#`, URL-encode the password in the connection string. Do not commit `.env`; update `.env.example` when you add or rename configuration variables.

## Development

Run the API in one terminal:

```powershell
cd backend
npm run dev
```

Run the React app in a second terminal:

```powershell
cd frontend\react-app
npm run dev
```

Vite prints the frontend URL, normally `http://localhost:5173`. Its `/health` proxy forwards requests to `http://localhost:3000`; if you change the backend port or add API prefixes, update `frontend/react-app/vite.config.ts`. The backend defaults to port `3000`; set `PORT` in `backend/.env` to change it.

The API health endpoint is `GET http://localhost:3000/health` and responds with:

```json
{
	"message": "Server health check: OK"
}
```

This endpoint confirms that the process responds; it does not check MongoDB readiness.

## Customizing the Template

- Rename the package in `backend/package.json` and `frontend/react-app/package.json` when you choose your project name.
- Replace the example model in `backend/src/types/example.ts`, the sample schema in `backend/src/schemas/customSchema.ts`, and the `issues` collection helper in `backend/src/db.ts` with your application's data model and collection names.
- Add controllers under `backend/src/controllers/`, define routes under `backend/src/routes/`, then register each router in `backend/src/index.ts`.
- Add required environment variables to `backend/.env.example` and configure their production values in your hosting provider. The production `npm start` command does not load `.env`.
- Restrict the default open CORS policy in `backend/src/index.ts` to your deployed frontend origin before production.
- Update the page title in `frontend/react-app/index.html` and replace the sample UI in `frontend/react-app/src/App.tsx`.
- When adding API paths, configure the Vite proxy in `frontend/react-app/vite.config.ts` for local development.

## Build and Run in Production

Build the frontend first; Vite outputs the static site to `frontend/react-app/dist`, which the backend serves:

```powershell
cd frontend\react-app
npm run build
cd ..\..\backend
npx tsc
npm start
```

The compiled backend is in `backend/dist`. Provide `PORT` and, when used, `MONGO_URI` and `DB_NAME` through the production environment. The backend's static file path assumes the frontend build remains at `frontend/react-app/dist`.

## Backend Commands

Run from `backend`:

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the API in watch mode and load `.env` |
| `npx tsc` | Compile the API to `dist/` |
| `npm start` | Start the compiled API; environment variables must be provided by the process/host |
| `npm test` | Placeholder; automated tests have not been added |

The frontend also provides `npm run dev`, `npm run build`, `npm run lint`, and `npm run preview`; run these from `frontend/react-app`.

## License

See [LICENSE](LICENSE).
