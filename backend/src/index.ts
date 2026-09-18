import express from "express";
import cors from "cors"
import debug from "debug";
import { healthRouter } from "./routes/health.js";

const logger = debug('backend:server');

const app = express();

const PORT = process.env.PORT || 3000

app.use(cors());
app.use(express.json());

app.get('/health',  healthRouter);

app.listen(PORT, () => {
  logger(`backend server is running on http://localhost:${PORT}`)
})

export default app;