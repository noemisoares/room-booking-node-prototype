const { lerBanco, salvarBanco } = require("../data/database");

function verificarConflito(salaId, inicio, fim) {
  const banco = lerBanco();
  const inicioMs = new Date(inicio).getTime();
  const fimMs = new Date(fim).getTime();

  return banco.reservas.some(reserva => {
    if (reserva.salaId !== parseInt(salaId)) return false;
    
    const reservaInicioMs = new Date(reserva.inicio).getTime();
    const reservaFimMs = new Date(reserva.fim).getTime();

    return !(fimMs <= reservaInicioMs || inicioMs >= reservaFimMs);
  });
}

function validarDatas(inicio, fim) {
  const dataInicio = new Date(inicio);
  const dataFim = new Date(fim);
  const agora = new Date();

  if (isNaN(dataInicio.getTime()) || isNaN(dataFim.getTime())) {
    return { valido: false, mensagem: "Datas inválidas" };
  }

  if (dataInicio >= dataFim) {
    return { valido: false, mensagem: "Data de início deve ser menor que data de fim" };
  }

  if (dataInicio < agora) {
    return { valido: false, mensagem: "Não é possível reservar datas no passado" };
  }

  return { valido: true };
}

function criarReserva(salaId, inicio, fim) {
  const validacao = validarDatas(inicio, fim);
  if (!validacao.valido) {
    return { sucesso: false, erro: validacao.mensagem };
  }

  if (verificarConflito(salaId, inicio, fim)) {
    return { sucesso: false, erro: "Conflito de horário: sala já está reservada neste período" };
  }

  const banco = lerBanco();
  const novaReserva = {
    id: Date.now(),
    salaId: parseInt(salaId),
    inicio,
    fim
  };

  banco.reservas.push(novaReserva);
  salvarBanco(banco);

  return { sucesso: true, reserva: novaReserva };
}

function obterReservasPorSala(salaId) {
  const banco = lerBanco();
  return banco.reservas.filter(r => r.salaId === parseInt(salaId));
}

module.exports = {
  criarReserva,
  verificarConflito,
  obterReservasPorSala
};