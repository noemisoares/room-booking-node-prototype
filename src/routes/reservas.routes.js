const express = require("express");
const router = express.Router();

let reservas = [];

router.post("/", (req, res) => {
  const { salaId, inicio, fim } = req.body;

  if (!salaId || !inicio || !fim) {
    return res.status(400).json({ erro: "Dados incompletos" });
  }

  const novaReserva = {
    id: reservas.length + 1,
    salaId,
    inicio,
    fim
  };

  reservas.push(novaReserva);

  res.status(201).json(novaReserva);
});

router.get("/", (req, res) => {
  res.json(reservas);
});

module.exports = router;
