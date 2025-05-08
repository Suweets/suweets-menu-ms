import tortas from "./controller/tortasController.js";
import bolos from "./controller/bolosController.js";
import fatias from "./controller/fatiasController.js";

export default function routes(app) {
  app.use(tortas);
  app.use(bolos);
  app.use(fatias);
}
