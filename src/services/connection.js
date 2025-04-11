import 'dotenv/config';
import { MongoClient } from "mongodb";

// Conexão com o mongo DB via URL
const url = process.env.MONGODB_URL;

// Variável para aramzenar o cliente do MongoDB
const client = new MongoClient(url);

// Variável para armazenar o nome do banco de dados
const dbName = process.env.MONGODB_DB_NAME;

// Função de conexão com o banco de dados
const connection = async (err) => {
  // Conecta o cliente ao banco
  await client.connect();
  console.log("Conectado ao servidor com sucesso");

  // Caso a conexão falhe, retirna um erro
  if (err) {
    console.error("Erro ao conectar: ", err);
    return;
  }

  // Variável para armazenar o nome do banco de dados
  const db = client.db(dbName);

  return db;
};

export default connection;