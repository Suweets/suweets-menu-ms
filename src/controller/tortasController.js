import { Router } from "express";
import * as tortas from "../repository/tortaRepository.js";

const endpoints = Router();

// Endpoint para buscar todas as tortas
endpoints.get("/tortas", async (req, res) => {
  const tortasList = await tortas.getAllTortas();

  if (!tortasList) {
    return res.send({
      message: "Não há tortas cadastradas",
    });
  }

  return res.status(200).send({
    message: "Lista de tortas",
    tortas: tortasList,
  });
});

// Endpoint para buscar torta pelo nome
endpoints.get("/tortas/:name", async (req, res) => {
  const name = req.params.name;
  const torta = await tortas.getTortaByName(name);

  if (!torta) {
    return res.status(404).send({
      message: "torta não encontrado",
    });
  }

  return res.status(200).send({
    message: "torta encontrada",
    torta: torta,
  });
});

// Endpoint para adicionar torta
endpoints.post("/tortas", async (req, res) => {
  const torta = req.body;

  let result = await tortas.addTorta(torta);

  if (!result) {
    return res.status(403).send({
      message: "Não foi possivel adicionar a torta"
    });
  }

  return res.status(200).send({
    message: "torta adicionado com sucesso",
    affectedRows: result
  })
});

// Endpoint para atualizar torta
endpoints.put("/tortas/:name", async (req, res) => {
  const name = req.params.name;
  const torta = req.body;

  let result = await tortas.updateTorta(name, torta);

  if (!result) {
    return res.status(403).send({
      message: "Não foi possivel atualizar o torta"
    });
  }

  return res.status(200).send({
    message: "Torta atualizada com sucesso",
    affectedRows: result
  })
});

// Endpoint para deletar torta
endpoints.delete("/tortas/:name", async (req, res) => {
  const name = req.params.name;

  let result = await tortas.deleteTorta(name);

  if (!result) {
    return res.status(403).send({
      message: "Não foi possivel deletar a torta"
    });
  }

  return res.status(200).send({
    message: "Torta deletata com sucesso",
    affectedRows: result
  })
});

export default endpoints;