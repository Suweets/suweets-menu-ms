import 'dotenv/config';
import connection from "../services/connection.js";

// Importando a conexão com o banco de dados
const db = await connection();

// Função para buscar todas as fatias
export async function getAllFatias() {
  const fatias = await db.collections(process.env.MONGODB_COLLECTION_NAME_SLICE).find({}).toArray();
  return fatias;
}

// Funcao para buscar fatia pelo nome
export async function getFatiasByName(name) {
  const fatia = await db.collection(process.env.MONGODB_COLLECTION_NAME_SLICE).findOne({ nome_fatia: name });

  if (!fatia) {
    return null;
  }

  return fatia;
}

// Função para adicionar fatia
export async function addFatia(fatia) {
  const result = await db.collection(process.env.MONGODB_COLLECTION_NAME_SLICE).insertOne({
    nome_fatia: fatia.nome,
    massa: fatia.massa,
    recheio: fatia.recheio,
    cobertura: fatia.cobertura,
    valor: fatia.valor,
    ingredientes: fatia.ingredientes,
    peso_g: fatia.peso_g
  });

  return result.insertedId;
}

// Função para atualizar as informações da fatia
export async function updateFatia(name, fatia) {
  const result = await db.collection(process.env.MONGODB_COLLECTION_NAME_SLICE).updateOne(
    { nome_fatia: name }, 
    {
      $set: {
        nome_fatia: fatia.nome,
        massa: fatia.massa,
        recheio: fatia.recheio,
        cobertura: fatia.cobertura,
        valor: fatia.valor,
        ingredientes: fatia.ingredientes,
        peso_g: fatia.peso
      }
    }
  );

  return result.modifiedCount;
}

// Função para deletar a fatia
export async function deleteFatia(id) {
  const result = await db.collection(process.env.MONGODB_COLLECTION_NAME_SLICE).deleteOne({ _id: id });

  return result.deletedCount;
}