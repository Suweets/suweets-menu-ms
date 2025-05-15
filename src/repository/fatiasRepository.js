import connection from "../services/connection.js";

// Função para buscar todos os fatias
export async function getAllFatias() {
  const query = `
    SELECT * FROM fatia;
  `;

  let [fatias] = await connection.query(query);

  return fatias;
};

// Função para adicionar fatia
export async function addFatia(fatia, ingredientes) {
  const query = `
    INSERT INTO fatia (nome_fatia, massa, recheio, cobertura, peso_g, valor)
    VALUES (?, ?, ?, ?, ?, ?);
  `;

  const values = [
    fatia.nome,
    fatia.massa,
    fatia.recheio,
    fatia.cobertura,
    fatia.peso,
    fatia.valor
  ];

  let [result] = await connection.query(query, values);

  ingredientes.forEach(element => {
    const query = `
      INSERT INTO fatia_ingrediente (id_fatia, ingrediente)
      VALUES (?, ?);
    `;

    const values = [
      result.insertId,
      element
    ];

    connection.query(query, values);
  });

  return result.insertId;
};

//Função para buscar fatia pelo nome
export async function getFatiaByNome(nome) {
  const query = `
    SELECT * FROM view_fatia_ingredientes WHERE nome_produto = ?;
  `;

  const [fatia] = await connection.query(query, [nome]);

  return fatia;
};

//Função para buscar fatia pelo id
export async function getFatiaById(id) {
  const query = `
    SELECT * FROM view_fatia_ingredientes WHERE id = ?;
  `;

  const [fatia] = await connection.query(query, [id]);

  return fatia;
};

// Função para buscar fatia pelo ingrediente
export async function getFatiaByIngrediente(ingrediente) {
  const query = `
    SELECT * FROM view_fatia_ingredientes WHERE ingrediente = ?;
  `;

  const [fatia] = await connection.query(query, [ingrediente]);

  return fatia;
}

// Função para atualizar as informações do fatia
export async function updateFatia(id, fatia) {
  const query = `
    UPDATE fatia
    SET nome_fatia = ?, massa = ?, recheio = ?, cobertura = ?, peso_g = ?, valor = ?
    WHERE id = ?;
  `;

  const values = [
    fatia.nome,
    fatia.massa,
    fatia.recheio,
    fatia.cobertura,
    fatia.peso,
    fatia.valor,
    id
  ];

  let [result] = await connection.query(query, values);

  return result.affectedRows;
};

//Função para deletar fatia
export async function deleteFatia(id) {
  const query = `
    DELETE FROM fatia WHERE id = ?;
  `;

  const values = [id];

  let [result] = await connection.query(query, values);

  return result.affectedRows;
};