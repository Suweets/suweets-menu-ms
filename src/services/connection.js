import 'dotenv/config';
import { MongoClient } from "mongodb";

const url = process.env.MONGODB_URL;
const client = new MongoClient(url);

const dbName = process.env.MONGODB_DB_NAME;

const connection = async (err) => {
  await client.connect();
  console.log("Connected successfully to server");

  if (err) {
    console.error("Error connecting to MongoDB:", err);
    return;
  }

  const db = client.db(dbName);

  return db;
};

export default connection;