const { lerBanco, salvarBanco } = require("../data/database");
const { criarReserva, obterReservasPorSala } = require("../services/booking.service");

function listarReservas(req, res) {
  const banco = lerBanco();
  return res.json(banco.reservas);
}

function criarNovaReserva(req, res) {
  const { salaId, inicio, fim } = req.body;

  if (!salaId || !inicio || !fim) {
    return res.status(400).json({
      erro: "salaId, inicio e fim são obrigatórios"
    });
  }

  const banco = lerBanco();
  const salaExiste = banco.salas.some(s => s.id === parseInt(salaId));

  if (!salaExiste) {
    return res.status(404).json({
      erro: "Sala não encontrada"
    });
  }

  const resultado = criarReserva(salaId, inicio, fim);

  if (!resultado.sucesso) {
    return res.status(409).json({
      erro: resultado.erro
    });
  }

  return res.status(201).json(resultado.reserva);
}

module.exports = {
  listarReservas,
  criarNovaReserva
};