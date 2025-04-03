import { Router } from "express";
import * as tortas from "../repository/tortaRepository.js";

const endpoints = Router();

endpoints.get("/tortas", async (req, res) => {
  const tortasList = await tortas.getAllTortas();

  if (tortasList.length === 0) {
    return res.send({
      message: "Não há tortas cadastradas",
    });
  }

  return res.status(200).send({
    message: "Lista de tortas",
    tortas: tortasList,
  });
});
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

endpoints.post("/tortas", async (req, res) => {
  const torta = req.body;

  let result = await tortas.addTorta(torta);

  if (result.length === 0) {
    return res.status(403).send({
      message: "Não foi possivel adicionar a torta"
    });
  }

  return res.status(200).send({
    message: "torta adicionado com sucesso",
    affectedRows: result
  })
});

endpoints.put("/tortas/:name", async (req, res) => {
  const name = req.params.name;
  const torta = req.body;

  let result = await tortas.updateTorta(name, torta);

  if (result.length === 0) {
    return res.status(403).send({
      message: "Não foi possivel atualizar o torta"
    });
  }

  return res.status(200).send({
    message: "torta atualizado com sucesso",
    affectedRows: result
  })
});

endpoints.delete("/tortas/:name", async (req, res) => {
  const name = req.params.name;

  let result = await tortas.deleteTorta(name);

  if (result.length === 0) {
    return res.status(403).send({
      message: "Não foi possivel deletar a torta"
    });
  }

  return res.status(200).send({
    message: "torta deletado com sucesso",
    affectedRows: result
  })
});

export default endpoints;