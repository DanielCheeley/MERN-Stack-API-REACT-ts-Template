import { MongoClient, Db, Collection } from "mongodb";
import type { dbDocument } from "./types/example.js";

const MONGO_URI = process.env.MONGO_URI;
const DB_NAME = process.env.DB_NAME;

if(!MONGO_URI) {
  throw new Error("missing requirement variable: MONGO_URI");
}
if(!DB_NAME) {
  throw new Error("missing requirement variable: DB_NAME");
}

const client = new MongoClient(MONGO_URI);

let db: Db;

export async function connectToDatabase(): Promise<Db> {
  await client.connect();
  db = client.db(DB_NAME)
  return db;
}

export function getIssuesCollection(): Collection<dbDocument> {
  return db.collection<dbDocument>("issues");
}

export async function closeDatabaseConnection(): Promise<void> {
  await client.close();
}