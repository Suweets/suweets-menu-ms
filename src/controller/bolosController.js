import { Router } from "express";
import * as bolos from "../repository/bolosRepository.js";

const endpoints = Router();

endpoints.get("/bolos", async (req, res) => {
  const bolosList = await bolos.getAllBolos();

  if (bolosList.length === 0) {
    return res.status(404).send({
      message: "Não há bolos cadastrados",
    });
  }

  return res.status(200).send({
    message: "Lista de bolos",
    bolos: bolosList,
  });
});

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

endpoints.post("/bolos", async (req, res) => {
  const bolo = req.body;

  let result = await bolos.addBolo(bolo);

  if (result.length === 0) {
    return res.status(403).send({
      message: "Não foi possivel adicionar o bolo"
    });
  }

  return res.status(200).send({
    message: "Bolo adicionado com sucesso",
    affectedRows: result
  })
});

endpoints.put("/bolos/:name", async (req, res) => {
  const name = req.params.name;
  const bolo = req.body;

  let result = await bolos.updateBolo(name, bolo);

  if (result.length === 0) {
    return res.status(403).send({
      message: "Não foi possivel atualizar o bolo"
    });
  }

  return res.status(200).send({
    message: "Bolo atualizado com sucesso",
    affectedRows: result
  })
});

endpoints.delete("/bolos/:name", async (req, res) => {
  const name = req.params.name;

  let result = await bolos.deleteBolo(name);

  if (result.length === 0) {
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