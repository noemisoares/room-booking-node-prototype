const { lerBanco, salvarBanco } = require("../data/database");

function listarSalas(req, res) {
  const banco = lerBanco();
  return res.json(banco.salas);
}

function criarSala(req, res) {
  const { nome, capacidade } = req.body;

  if (!nome || !capacidade) {
    return res.status(400).json({
      erro: "Nome e capacidade são obrigatórios"
    });
  }

  const banco = lerBanco();

  const novaSala = {
    id: Date.now(),
    nome,
    capacidade
  };

  banco.salas.push(novaSala);
  salvarBanco(banco);

  return res.status(201).json(novaSala);
}

module.exports = {
  listarSalas,
  criarSala
};
