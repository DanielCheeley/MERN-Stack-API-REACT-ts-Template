# MERN Stack API React TypeScript Template

A TypeScript Express API starter with MongoDB support. The backend includes a health route, request logging, error middleware, graceful database shutdown, and a basic project structure for adding controllers, routes, and database collections.

The current repository contains the backend template. A React frontend can be added separately and served by the backend after it has been built.

## Requirements

- Node.js 20 or newer
- npm
- A MongoDB database, such as MongoDB Atlas or a local MongoDB instance

## Project Structure

```text
backend/
  src/
	 controllers/       Request handlers
	 middleware/        Logging and error handling
	 routes/            Express route definitions
	 types/             Shared TypeScript types
	 db.ts              MongoDB connection and collection helpers
	 index.ts           Express application entry point
  .env.example         Environment variable template
  package.json         Backend scripts and dependencies
  tsconfig.json        TypeScript configuration
```

## Setup

1. Clone or download the repository.

2. Open a terminal in the repository root and move into the backend:

```powershell
cd backend
```

3. Install the backend dependencies:

```powershell
npm install
```

4. Create a local environment file from the example:

```powershell
Copy-Item .env.example .env
```

5. Open `backend/.env` and replace the placeholder values:

```env
PORT=3000
DEBUG=backend:*
MONGO_URI=mongodb+srv://username:password@your-cluster.mongodb.net/
DB_NAME=your_database_name
```

`MONGO_URI` must be a valid MongoDB connection string. If the password contains characters such as `@`, `:`, `/`, or `#`, URL-encode the password before placing it in the connection string.

Do not commit `.env`. It is ignored by git. Commit changes to `.env.example` only when you add or rename configuration variables.

## Run During Development

From the `backend` directory:

```powershell
npm run dev
```

The server runs on `http://localhost:3000` by default. Change `PORT` in `.env` to use another port.

Check that the API is running:

```text
GET http://localhost:3000/health
```

Expected response:

```json
{
  "message": "Backend is running!"
}
```

The development command loads `.env` automatically and restarts the server when source files change.

## Adding Your Own Project

The usual customization path is:

1. Rename the repository and update the project name in `backend/package.json`.
2. Replace the example type in `backend/src/types/` with the types used by your application.
3. Add MongoDB collection helpers in `backend/src/db.ts` or split database access into separate modules as the project grows.
4. Create controllers in `backend/src/controllers/`.
5. Create route modules in `backend/src/routes/` and register them in `backend/src/index.ts`.
6. Replace the example health message if your project needs a different health response.
7. Update `backend/.env.example` whenever your application requires new environment variables.
8. Configure CORS in `backend/src/index.ts` for the frontend's deployed origin before deploying.

For a frontend, create a `frontend` application and build it into `frontend/dist`. The backend currently contains a static-file path for that location, but there is no frontend project included in this repository yet.

## Available Commands

Run these commands from `backend`:

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the TypeScript API in watch mode |
| `npm start` | Start the compiled API from `dist/index.js` |
| `npm test` | Placeholder test command; tests have not been added yet |

## Production Build

The current template does not define an `npm run build` script. To compile the TypeScript backend manually:

```powershell
npx tsc
npm start
```

Before deploying, provide `PORT`, `MONGO_URI`, and `DB_NAME` through the hosting platform's environment configuration. The production start command does not load `.env` automatically.

## Important Notes

- The API attempts to connect to MongoDB during startup.
- The default CORS configuration allows requests from any origin. Restrict it before production use.
- The `/health` route confirms that the process is responding; it does not currently verify database readiness.
- Keep credentials and other secrets out of source control.
- Add request validation, authentication, authorization, rate limiting, and automated tests as your application requires them.

## License

See [LICENSE](LICENSE).
