import tortas from "./controller/tortasController.js";
import fatias from "./controller/fatiasController.js";
import bolos from "./controller/bolosController.js";

export default function routes(app) {
  app.use(tortas);
  app.use(fatias);
  app.use(bolos);
}