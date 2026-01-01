const express = require("express");
const { listarReservas, criarNovaReserva } = require("../controllers/reservas.controller");

const router = express.Router();

router.get("/", listarReservas);
router.post("/", criarNovaReserva);

module.exports = router;
