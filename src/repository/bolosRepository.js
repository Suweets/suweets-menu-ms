import "dotenv/config";
import connection from "../services/connection.js";

// Importando a conexão com o banco de dados
const db = await connection();

// Função para buscar todos os bolos
export async function getAllBolos() {
  const bolos = await db.collection(process.env.MONGODB_COLLECTION_NAME_CAKE).find({}).toArray();
  return bolos;
}

// Função para adicionar Bolo
export async function addBolo(bolo) {
  const result = await db.collection(process.env.MONGODB_COLLECTION_NAME_CAKE).insertOne({
    nome_bolo: bolo.nome,
    massa: bolo.massa,
    recheio: bolo.recheio,
    cobertura: bolo.cobertura,
    peso_kg: bolo.peso,
    valor: bolo.valor,
    ingredientes: bolo.ingredientes
  });

  return result.insertedId;
}

// Função para buscar bolo pelo nome
export async function getBoloByName(name) {
  const bolo = await db.collection(process.env.MONGODB_COLLECTION_NAME_CAKE).findOne({ nome_bolo: name });

  if (!bolo) {
    return null;
  }

  return bolo;
}

// Função para atualizar as informações do bolo
export async function updateBolo(name, bolo) {
  const result = await db.collection(process.env.MONGODB_COLLECTION_NAME_CAKE).updateOne(
    { nome_bolo: name },
    {
      $set: {
        nome_bolo: bolo.nome,
        massa: bolo.massa,
        recheio: bolo.recheio,
        cobertura: bolo.cobertura,
        peso_kg: bolo.peso,
        valor: bolo.valor,
        ingredientes: bolo.ingredientes
      }
    }
  );

  return result.modifiedCount;
}

//Função para deletar bolo
export async function deleteBolo(id) {
  const result = await db.collection(process.env.MONGODB_COLLECTION_NAME_CAKE).deleteOne({ _id: id });

  return result.deletedCount;
}