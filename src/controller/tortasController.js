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

export default endpoints;