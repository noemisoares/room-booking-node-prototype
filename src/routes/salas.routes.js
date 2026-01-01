const express = require("express");
const {
  listarSalas,
  criarSala
} = require("../controllers/salas.controller");

const router = express.Router();

router.get("/", listarSalas);
router.post("/", criarSala);

module.exports = router;