import express from "express";
import cors from "cors"
import debug from "debug";
import path from "node:path";
import { healthRouter } from "./routes/health.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { logRequest } from "./middleware/logger.js";
import { connectToDatabase, closeDatabaseConnection } from "./db.js";

const logger = debug('backend:server');

const app = express();
app.use(cors());
const PORT = process.env.PORT || 3000

//use the logger middleware to log all incoming requests, parse incomeing JSON requests and to set up the routes for the app
app.use(logRequest)
app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.use(express.static(path.join(import.meta.dirname, '../frontend/dist')))

//add all routes here
app.get('/health',  healthRouter);

//connect to db
try {
  await connectToDatabase()
  logger(`Connected to MongoDB`)
} catch(error) {
  logger(`Could Not connect to MongoDB`)
}


//use the error handler middleware to handle any arrors tha occur during request processing and starting up the server. must be the last thing before app.listen to make sure that it can catch every error wihout crashing the server.
app.use(errorHandler)

app.listen(PORT, () => {
  logger(`backend server is running on http://localhost:${PORT}`)
})

async function shutdown(signal: string) {
  logger(`Received ${signal}. Closing server...`);
  await closeDatabaseConnection();
  logger("Database connection closed. Exiting process.");
  process.exit(0);
}

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));

export default app;