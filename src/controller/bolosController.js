import { Router } from "express";
import * as bolos from "../repository/bolosRepository.js";

const endpoints = Router();

// Endpoint para buscar todos os bolos
endpoints.get("/bolos", async (req, res) => {
  const bolosList = await bolos.getAllBolos();

  if (!bolosList) {
    return res.status(404).send({
      message: "Não há bolos cadastrados",
    });
  }

  return res.status(200).send({
    message: "Lista de bolos",
    bolos: bolosList,
  });
});

// Endpoint para buscar bolo pelo ingrediente
endpoints.get("/bolos/:ingrediente", async (req, res) => {
  const ingrediente = req.params.ingrediente;
  const bolo = await bolos.getBoloByIngrediente(ingrediente);

  if (!bolo) {
    return res.status(404).send({
      message: "Bolo não encontrado",
    });
  }

  return res.status(200).send({
    message: "Bolo encontrado",
    bolo: bolo,
  });
});

// Endpoint para buscar o bolo pelo nome
endpoints.get("/bolos/:nome", async (req, res) => {
  const nome = req.params.nome;
  const bolo = await bolos.getBoloByNome(nome);

  if (!bolo) {
    return res.status(404).send({
      message: "Bolo não encontrado",
    });
  }

  return res.status(200).send({
    message: "Bolo encontrado",
    bolo: bolo,
  });
});

// Endpoint para buscar bolo pelo id
endpoints.get("/bolos/:id", async (req, res) => {
  const id = req.params.id;
  const bolo = await bolos.getBoloById(id);

  if (!bolo) {
    return res.status(404).send({
      message: "Bolo não encontrado",
    });
  }

  return res.status(200).send({
    message: "Bolo encontrado",
    bolo: bolo,
  });
});

// Endpoint para adicionar bolo
endpoints.post("/bolos", async (req, res) => {
  const { bolo, ingredientes } = req.body;

  let resultExist = await bolos.getBoloByNome(bolo.nome);

  if (resultExist) {
    return res.status(403).send({
      message: "Bolo já cadastrado"
    });
  }

  let result = await bolos.addBolo(bolo, ingredientes);

  if (!result) {
    return res.status(403).send({
      message: "Não foi possivel adicionar o bolo"
    });
  }

  return res.status(200).send({
    message: "Bolo adicionado com sucesso",
    affectedRows: result
  })
});

// Endpoint para atualizar bolo
endpoints.put("/bolos/:id", async (req, res) => {
  const id = req.params.id;
  const bolo = req.body;

  let resultExist = await bolos.getBoloByNome(bolo.nome);

  if (resultExist) {
    return res.status(403).send({
      message: "Bolo já cadastrado"
    });
  }

  let result = await bolos.updateBolo(id, bolo);

  if (!result) {
    return res.status(403).send({
      message: "Não foi possivel atualizar o bolo"
    });
  }

  return res.status(200).send({
    message: "Bolo atualizado com sucesso",
    affectedRows: result
  })
});

// Endpoint para deletar bolo
endpoints.delete("/bolos/:id", async (req, res) => {
  const id = req.params.id;

  let result = await bolos.deleteBolo(id);

  if (!result) {
    return res.status(403).send({
      message: "Não foi possivel deletar o bolo"
    });
  }

  return res.status(200).send({
    message: "Bolo deletado com sucesso",
    affectedRows: result
  })
});

export default endpoints;