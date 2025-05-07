import { Router } from "express";
import * as tortas from "../repository/tortaRepository.js";

const endpoints = Router();

// Endpoint para buscar todos os tortas
endpoints.get("/tortas", async (req, res) => {
  const tortasList = await tortas.getAllTortas();

  if (!tortasList) {
    return res.status(404).send({
      message: "Não há tortas cadastradas",
    });
  }

  return res.status(200).send({
    message: "Lista de tortas",
    tortas: tortasList,
  });
});

// Endpoint para buscar torta pelo ingrediente
endpoints.get("/tortas/:ingrediente", async (req, res) => {
  const ingrediente = req.params.ingrediente;
  const torta = await tortas.getTortaByIngrediente(ingrediente);

  if (!torta) {
    return res.status(404).send({
      message: "Torta não encontrada",
    });
  }

  return res.status(200).send({
    message: "Torta encontrada",
    torta: torta,
  });
});

// Endpoint para buscar o torta pelo nome
endpoints.get("/tortas/:nome", async (req, res) => {
  const nome = req.params.nome;
  const torta = await tortas.getTortaByNome(nome);

  if (!torta) {
    return res.status(404).send({
      message: "Torta não encontrada",
    });
  }

  return res.status(200).send({
    message: "Torta encontrada",
    torta: torta,
  });
});

// Endpoint para buscar torta pelo id
endpoints.get("/tortas/:id", async (req, res) => {
  const id = req.params.id;
  const torta = await tortas.getTortaById(id);

  if (!torta) {
    return res.status(404).send({
      message: "torta não encontrada",
    });
  }

  return res.status(200).send({
    message: "Torta encontrada",
    torta: torta,
  });
});

// Endpoint para adicionar torta
endpoints.post("/tortas", async (req, res) => {
  const { torta, ingredientes } = req.body;

  let resultExist = await tortas.geTtortaByNome(torta.nome);

  if (resultExist) {
    return res.status(403).send({
      message: "Torta já cadastrada"
    });
  }

  let result = await tortas.addTorta(torta, ingredientes);

  if (!result) {
    return res.status(403).send({
      message: "Não foi possivel adicionar a torta"
    });
  }

  return res.status(200).send({
    message: "Torta adicionado com sucesso",
    affectedRows: result
  })
});

// Endpoint para atualizar torta
endpoints.put("/tortas/:id", async (req, res) => {
  const id = req.params.id;
  const torta = req.body;

  let resultExist = await tortas.getTortaByNome(torta.nome);

  if (resultExist) {
    return res.status(403).send({
      message: "Torta já cadastrada"
    });
  }

  let result = await tortas.updateTorta(id, torta);

  if (!result) {
    return res.status(403).send({
      message: "Não foi possivel atualizar a torta"
    });
  }

  return res.status(200).send({
    message: "Torta atualizada com sucesso",
    affectedRows: result
  })
});

// Endpoint para deletar Torta
endpoints.delete("/tortas/:id", async (req, res) => {
  const id = req.params.id;

  let result = await tortas.deleteTorta(id);

  if (!result) {
    return res.status(403).send({
      message: "Não foi possivel deletar a torta"
    });
  }

  return res.status(200).send({
    message: "Torta deletada com sucesso",
    affectedRows: result
  })
});

export default endpoints;