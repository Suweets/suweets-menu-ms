import 'dotenv/config';
import connection from "../services/connection.js";

// Importando a conexão com o banco de dados
const db = await connection();

// Função para buscar todas as tortas
export async function getAllTortas() {
  const tortas = await db.collection(process.env.MONGODB_COLLECTION_NAME_PIE).find({}).toArray();
  return tortas;
}

// Função para adicionar Torta
export async function addTorta(torta) {
  const result = await db.collection(process.env.MONGODB_COLLECTION_NAME_PIE).insertOne({
    nome_torta: torta.nome,
    massa: torta.massa,    
    peso_kg: torta.peso,
    valor: torta.valor,
    ingredientes: torta.ingredientes
  });
  return result.insertedId;
}

// Função para buscar torta pelo nome
export async function getTortaByName(name) {
  const torta = await db.collection(process.env.MONGODB_COLLECTION_NAME_PIE).findOne({ nome_torta: name });

  if (!torta) {
    return null;
  }

  return torta;
}

// Função para atualizar as informações da torta
export async function updateTorta(name, torta) {
  const result = await db.collection(process.env.MONGODB_COLLECTION_NAME_PIE).updateOne(
    { nome_torta: name },
    {
      $set: {
        nome_torta: torta.nome,
        massa: torta.massa,
        recheio: torta.recheio,       
        peso_kg: torta.peso,
        valor: torta.valor,
        ingredientes: torta.ingredientes
      }
    }
  );

  return result.modifiedCount;
}

// Função para deletar torta
export async function deleteTorta(id) {
  const result = await db.collection(process.env.MONGODB_COLLECTION_NAME_PIE).deleteOne({ _id: id });

  return result.deletedCount;
}

