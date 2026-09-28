import express from "express";
import cors from "cors"
import debug from "debug";
import path from "node:path";
import { healthRouter } from "./routes/health.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { logRequest } from "./middleware/logger.js";

const logger = debug('backend:server');
let closeDatabaseConnection: (() => Promise<void>) | undefined;

const app = express();
// Restrict this open CORS policy to the deployed frontend origin before production.
app.use(cors());
const PORT = process.env.PORT || 3000

//use the logger middleware to log all incoming requests, parse incomeing JSON requests and to set up the routes for the app
app.use(logRequest)
app.use(express.urlencoded({ extended: true }))
app.use(express.json());
// Keep this aligned with the Vite build output; the relative path works from src/ and dist/.
app.use(express.static(path.resolve(import.meta.dirname, '../../frontend/react-app/dist')))

//add all routes here
app.use('/health', healthRouter);

// Load the database module only when a connection string is configured.
if (process.env.MONGO_URI) {
  try {
    const database = await import("./db.js");
    closeDatabaseConnection = database.closeDatabaseConnection;
    await database.connectToDatabase();
    logger("Connected to MongoDB");
  } catch (error) {
    logger("Could not connect to MongoDB please reconfigure your .env if you expected to connect to a mongodb");
  }
} else {
  logger("MONGO_URI is not set; skipping MongoDB connection");
}


//use the error handler middleware to handle any arrors tha occur during request processing and starting up the server. must be the last thing before app.listen to make sure that it can catch every error wihout crashing the server.
app.use(errorHandler)

app.listen(PORT, () => {
  logger(`backend server is running on http://localhost:${PORT}`)
})

async function shutdown(signal: string) {
  logger(`Received ${signal}. Closing server...`);
  await closeDatabaseConnection?.();
  logger("Shutdown complete. Exiting process.");
  process.exit(0);
}

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));

export default app;