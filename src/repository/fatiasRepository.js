import connection from "../services/connection.js";

// Função para buscar todos os fatias
export async function getAllFatias() {
  const query = `
    SELECT * FROM fatia;
  `;

  let [fatias] = await connection.query(query);

  return fatias;
}

// Função para adicionar fatia
export async function addFatia(fatia, ingredientes) {
  const query = `
    INSERT INTO fatia (nome_fatia, massa, recheio, cobertura, peso_kg, valor)
    VALUES (?, ?, ?, ?, ?, ?);
  `;

  const values = [
    fatia.nome,
    fatia.massa,
    fatia.recheio,
    fatia.cobertura,
    fatia.peso,
    fatia.valor,
  ];

  let [result] = await connection.query(query, values);

  ingredientes.forEach((element) => {
    const query = `
      INSERT INTO fatia_ingrediente (id_fatia, ingrediente)
      VALUES (?, ?);
    `;

    const values = [result.insertedId, element];

    connection.query(query, values);
  });

  return result.insertedId;
}

//Função para buscar fatia pelo nome
export async function getFatiaByNome(nome) {
  const query = `
    SELECT fi.*
    FROM fatia_ingrediente fi
    JOIN fatia f ON fi.id_fatia = f.id_fatia
    WHERE f.nome_fatia = ?;
  `;

  const [fatia] = await connection.query(query, [nome]);
  return fatia;
}

//Função para buscar fatia pelo id
export async function getFatiaById(id) {
  const query = `
    SELECT * FROM fatia_ingrediente WHERE id = ?;
  `;

  const [fatia] = await connection.query(query, [id]);

  return fatia;
}

// Função para buscar fatia pelo ingrediente
export async function getFatiaByIngrediente(ingrediente) {
  const query = `
    SELECT * FROM fatia_ingrediente WHERE ingrediente = ?;
  `;

  const [fatia] = await connection.query(query, [ingrediente]);

  return fatia;
}

// Função para atualizar as informações do fatia
export async function updateFatia(id, fatia) {
  const query = `
    UPDATE fatia
    SET nome_fatia = ?, massa = ?, recheio = ?, cobertura = ?, peso_kg = ?, valor = ?
    WHERE id_fatia = ?;
  `;

  const values = [
    fatia.nome,
    fatia.massa,
    fatia.recheio,
    fatia.cobertura,
    fatia.peso,
    fatia.valor,
    id,
  ];

  let [result] = await connection.query(query, values);

  return result.affectedRows;
}

//Função para deletar fatia
export async function deleteFatia(id) {
  const query = `
    DELETE FROM fatia WHERE id_fatia = ?;
  `;

  const values = [id];

  let [result] = await connection.query(query, values);

  return result.affectedRows;
}
