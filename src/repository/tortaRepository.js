import connection from "../services/connection.js";

const db = await connection();

export async function getAllTortas() {
  const tortas = await db.collection("tortas").find({}).toArray();
  return tortas;
}