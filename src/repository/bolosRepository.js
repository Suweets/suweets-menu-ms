import connection from "../services/connection.js";

// Função para buscar todos os bolos
export async function getAllBolos() {
  const query = `
    SELECT * FROM bolo;
  `;

  let [bolos] = await connection.query(query);

  return bolos;
};

// Função para adicionar Bolo
export async function addBolo(bolo, ingredientes) {
  const query = `
    INSERT INTO bolo (nome_bolo, massa, recheio, cobertura, peso_kg, valor)
    VALUES (?, ?, ?, ?, ?, ?);
  `;

  const values = [
    bolo.nome,
    bolo.massa,
    bolo.recheio,
    bolo.cobertura,
    bolo.peso,
    bolo.valor
  ];

  let [result] = await connection.query(query, values);

  console.log(result.insertId);

  ingredientes.forEach(element => {
    const query = `
      INSERT INTO bolo_ingrediente (id_bolo, ingrediente)
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

//Função para buscar bolo pelo nome
export async function getBoloByNome(nome) {
  const query = `
    SELECT * FROM view_bolo_ingredientes WHERE nome_bolo = ?;
  `;

  const [bolo] = await connection.query(query, [nome]);

  return bolo;
};

//Função para buscar bolo pelo nome
export async function getBoloBydId(id) {
  const query = `
    SELECT * FROM view_bolo_ingredientes WHERE id_bolo = ?;
  `;

  const [bolo] = await connection.query(query, [id]);

  return bolo;
};

// Função para buscar bolo pelo ingrediente
export async function getBoloByIngrediente(ingrediente) {
  const query = `
    SELECT * FROM view_bolo_ingredientes WHERE ingrediente = ?;
  `;

  const [bolo] = await connection.query(query, [ingrediente]);

  return bolo;
};

// Função para atualizar as informações do bolo
export async function updateBolo(id, bolo) {
  const query = `
    UPDATE bolo
    SET nome_bolo = ?, massa = ?, recheio = ?, cobertura = ?, peso_kg = ?, valor = ?
    WHERE id = ?;
  `;

  const values = [
    bolo.nome,
    bolo.massa,
    bolo.recheio,
    bolo.cobertura,
    bolo.peso,
    bolo.valor,
    id
  ];

  let [result] = await connection.query(query, values);

  return result.affectedRows;
};

//Função para deletar bolo
export async function deleteBolo(id) {
  const query = `
    DELETE FROM bolo WHERE id = ?;
  `;

  const values = [id];

  let [result] = await connection.query(query, values);

  return result.affectedRows;
};