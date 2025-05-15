import { Router } from "express";
import * as fatias from "../repository/fatiasRepository.js";

const endpoints = Router();

// Endpoint para buscar todos os fatias
endpoints.get("/fatias", async (req, res) => {
  const fatiasList = await fatias.getAllFatias();

  if (!fatiasList) {
    return res.status(404).send({
      message: "Não há fatias cadastradas",
    });
  }

  return res.status(200).send({
    message: "Lista de fatias",
    fatias: fatiasList,
  });
});

// Endpoint para buscar fatia pelo ingrediente
endpoints.get("/fatias/:ingrediente", async (req, res) => {
  const ingrediente = req.params.ingrediente;
  const fatia = await fatias.getFatiaByIngrediente(ingrediente);

  if (!fatia) {
    return res.status(404).send({
      message: "Fatia não encontrada",
    });
  }

  return res.status(200).send({
    message: "Fatia encontrada",
    fatia: fatia,
  });
});

// Endpoint para buscar o fatia pelo nome
endpoints.get("/fatias/:nome", async (req, res) => {
  const nome = req.params.nome;
  const fatia = await fatias.getFatiaByNome(nome);

  if (!fatia) {
    return res.status(404).send({
      message: "Fatia não encontrada",
    });
  }

  return res.status(200).send({
    message: "Fatia encontrada",
    fatia: fatia,
  });
});

// Endpoint para buscar fatia pelo id
endpoints.get("/fatias/:id", async (req, res) => {
  const id = req.params.id;
  const fatia = await fatias.getFatiaById(id);

  if (!fatia) {
    return res.status(404).send({
      message: "Fatia não encontrada",
    });
  }

  return res.status(200).send({
    message: "Fatia encontrada",
    fatia: fatia,
  });
});

// Endpoint para adicionar fatia
endpoints.post("/fatias", async (req, res) => {
  const { fatia, ingredientes } = req.body;

  let resultExist = await fatias.getFatiaByNome(fatia.nome);

  if (resultExist.length > 0) {
    return res.status(403).send({
      message: "Fatia já cadastrada"
    });
  }

  let result = await fatias.addFatia(fatia, ingredientes);

  if (!result) {
    return res.status(403).send({
      message: "Não foi possivel adicionar a fatia"
    });
  }

  return res.status(200).send({
    message: "Fatia adicionado com sucesso",
    affectedRows: result
  })
});

// Endpoint para atualizar fatia
endpoints.put("/fatias/:id", async (req, res) => {
  const id = req.params.id;
  const fatia = req.body;

  let resultExist = await fatias.getFatiaByNome(fatia.nome);

  if (resultExist) {
    return res.status(403).send({
      message: "Fatia já cadastrada"
    });
  }

  let result = await fatias.updateFatia(id, fatia);

  if (!result) {
    return res.status(403).send({
      message: "Não foi possivel atualizar a fatia"
    });
  }

  return res.status(200).send({
    message: "Fatia atualizada com sucesso",
    affectedRows: result
  })
});

// Endpoint para deletar fatia
endpoints.delete("/fatias/:id", async (req, res) => {
  const id = req.params.id;

  let result = await fatias.deleteFatia(id);

  if (!result) {
    return res.status(403).send({
      message: "Não foi possivel deletar a fatia"
    });
  }

  return res.status(200).send({
    message: "Fatia deletada com sucesso",
    affectedRows: result
  })
});

export default endpoints;