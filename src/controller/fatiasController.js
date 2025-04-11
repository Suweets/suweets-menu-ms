import { Router } from "express";
import * as fatias from "../repository/fatiasRepository.js";

const endpoints = Router();

// Endpoint para buscar todas as fatias
endpoints.get("/fatias", async (req, res) => {
  const fatiasList = await fatias.getAllFatias();

  if (!fatiasList) {
    return res.status(404).send({
      message: "Não há fatias cadastradas",
    });
  }

  return res.status(200).send({
    fatias: fatiasList,
  });
});

// Endpoint para buscar fatia pelo nome
endpoints.get("/fatias/:name", async (req, res) => {
  const name = req.params.name;
  const fatia = await fatias.getFatiasByName(name);

  if (!fatia) {
    return res.status(404).send({
      message: "Fatia não encontrada",
    });
  }

  return res.status(200).send({
    fatia: fatia,
  });
});

// Endpoint para adicionar fatia
endpoints.post("/fatias", async (req, res) => {
  const fatia = req.body;

  let result = await fatias.addFatia(fatia);

  if (!result) {
    return res.status(403).send({
      message: "Não foi possível adicionar a fatia"
    });
  }

  return res.status(200).send({
    message: "Fatia adicionada com sucesso",
    affectedRows: result
  });
});

// Endpoint para atualizar fatia
endpoints.put("/fatias/:name", async (req, res) => {
  const name = req.params.name;
  const fatia = req.body;

  let result = await fatias.updateFatia(name, fatia);

  if (!result) {
    return res.status(403).send({
      message: "Não foi possível atualizar a fatia"
    });
  }

  return res.status(200).send({
    message: "fatia atualizada com sucesso",
    affectedrows: result
  });
});

// Endpoint para deletar fatia
endpoints.delete("/fatias/:name", async (req, res) => {
  const name = req.params.name;

  let result = await fatias.deleteFatia(name);

  if (!result) {
    return res.status(403).send({
      message: "Não foi possível deletar a fatia"
    });
  }

  return res.status(200).send({
    message: "Fatia deletada com sucesso",
    affectedRows: result
  })
});

export default endpoints;