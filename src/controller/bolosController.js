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

// Endpoint para buscar bolo pelo nome
endpoints.get("/bolos/:name", async (req, res) => {
  const name = req.params.name;
  const bolo = await bolos.getBoloByName(name);

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
  const bolo = req.body;

  let result = await bolos.addBolo(bolo);

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
endpoints.put("/bolos/:name", async (req, res) => {
  const name = req.params.name;
  const bolo = req.body;

  let result = await bolos.updateBolo(name, bolo);

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
endpoints.delete("/bolos/:name", async (req, res) => {
  const name = req.params.name;

  let result = await bolos.deleteBolo(name);

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