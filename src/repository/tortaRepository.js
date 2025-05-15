import connection from "../services/connection.js";

// Função para buscar todos os tortas
export async function getAllTortas() {
  const query = `
    SELECT * FROM torta;
  `;

  let [tortas] = await connection.query(query);

  return tortas;
}

// Função para adicionar torta
export async function addTorta(torta, ingredientes) {
  const query = `
    INSERT INTO torta (nome_torta, massa, recheio, cobertura, peso_kg, valor)
    VALUES (?, ?, ?, ?, ?, ?);
  `;

  const values = [
    torta.nome,
    torta.massa,
    torta.recheio,
    torta.cobertura,
    torta.peso,
    torta.valor
  ];

  let [result] = await connection.query(query, values);

  ingredientes.forEach(element => {
    const query = `
      INSERT INTO torta_ingrediente (id_torta, ingrediente)
      VALUES (?, ?);
    `;

    const values = [
      result.inserted,
      element
    ];

    connection.query(query, values);
  });

  return result.insertId;
};

//Função para buscar torta pelo nome
export async function getTortaByNome(nome) {
  const query = `
    SELECT * FROM view_torta_ingredientes WHERE nome_produto = ?;
  `;

  const [torta] = await connection.query(query, [nome]);

  return torta;
};

//Função para buscar torta pelo id
export async function getTortaBydId(id) {
  const query = `
    SELECT * FROM view_torta_ingredientes WHERE id = ?;
  `;

  const [torta] = await connection.query(query, [id]);

  return torta;
};

// Função para buscar torta pelo ingrediente
export async function getTortaByIngrediente(ingrediente) {
  const query = `
    SELECT * FROM view_torta_ingredientes WHERE ingrediente = ?;
  `;

  const [torta] = await connection.query(query, [ingrediente]);

  return torta;
};

// Função para atualizar as informações do torta
export async function updateTorta(id, torta) {
  const query = `
    UPDATE torta
    SET nome_torta = ?, massa = ?, recheio = ?, cobertura = ?, peso_kg = ?, valor = ?
    WHERE id = ?;
  `;

  const values = [
    torta.nome,
    torta.massa,
    torta.recheio,
    torta.cobertura,
    torta.peso,
    torta.valor,
    id
  ];

  let [result] = await connection.query(query, values);

  return result.affectedRows;
};

//Função para deletar torta
export async function deleteTorta(id) {
  const query = `
    DELETE FROM torta WHERE id = ?;
  `;

  const values = [id];

  let [result] = await connection.query(query, values);

  return result.affectedRows;
};