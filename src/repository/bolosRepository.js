import connection from "../services/connection.js";

const db = await connection();

export async function getAllBolos() {
  const bolos = await db.collection("bolos_prontos").find({}).toArray();
  return bolos;
}

export async function addBolo(bolo) {
  const result = await db.collection("bolos_prontos").insertOne({
    nome_bolo: bolo.nome,
    massa: bolo.massa,
    recheio: bolo.recheio,
    cobertura: bolo.cobertura,
    peso_kg: bolo.peso,
    valor: bolo.valor
  });

  return result;
}

export async function getBoloByName(name) {
  const bolo = await db.collection("bolos_prontos").findOne({ nome_bolo: name });

  if (!bolo) {
    return null;
  }

  return bolo;
}

export async function updateBolo(name, bolo) {
  const result = await db.collection("bolos_prontos").updateOne(
    { nome_bolo: name },
    {
      $set: {
        nome_bolo: bolo.nome,
        massa: bolo.massa,
        recheio: bolo.recheio,
        cobertura: bolo.cobertura,
        peso_kg: bolo.peso,
        valor: bolo.valor
      }
    }
  );

  return result;
}

export async function deleteBolo(name) {
  const result = await db.collection("bolos_prontos").deleteOne({ nome_bolo: name });

  return result;
}