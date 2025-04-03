import connection from "../services/connection.js";

const db = await connection();

export async function getAllTortas() {
  const tortas = await db.collection("tortas").find({}).toArray();
  return tortas;
  

}

export async function addTorta(torta) {
  const result = await db.collection("tortas").insertOne({
    nome_torta: torta.nome,
    massa: torta.massa,    
    peso_kg: torta.peso,
    valor: torta.valor
  });
  return result;
}


export async function getTortaByName(name) {
  const torta = await db.collection("tortas").findOne({ nome_torta: name });

  if (!torta) {
    return null;
  }

  return torta;
}

export async function updateTorta(name, torta) {
  const result = await db.collection("tortas").updateOne(
    { nome_torta: name },
    {
      $set: {
        nome_torta: torta.nome,
        massa: torta.massa,
        recheio: torta.recheio,       
        peso_kg: torta.peso,
        valor: torta.valor
      }
    }
  );

  return result;
}

export async function deleteTorta(name) {
  const result = await db.collection("tortas").deleteOne({ nome_torta: name });

  return result;
}

