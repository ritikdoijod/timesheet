import { MongoClient } from "mongodb";
const { MONGODB_URI = "" } = process.env;
const client = new MongoClient(MONGODB_URI);
const db = client.db();
export { client, db };
