let salas = [];

document.addEventListener('DOMContentLoaded', () => {
  carregarSalas();
  carregarReservas();
  inicializarTabs();
});

function inicializarTabs() {
  document.querySelectorAll('.tab-button').forEach(button => {
    button.addEventListener('click', () => {
      const tabName = button.getAttribute('data-tab');
      mudarAba(tabName, button);
    });
  });
}

function mudarAba(tabName, button) {
  document.querySelectorAll('.tab-content').forEach(tab => {
    tab.classList.remove('active');
  });
  document.querySelectorAll('.tab-button').forEach(btn => {
    btn.classList.remove('active');
  });

  document.getElementById(tabName).classList.add('active');
  button.classList.add('active');

  if (tabName === 'salas') {
    carregarSalas();
  } else if (tabName === 'reservas') {
    carregarReservas();
  } else if (tabName === 'reservar') {
    preencherSelectSalas();
  }
}

function carregarSalas() {
  fetch('/api/salas')
    .then(res => res.json())
    .then(data => {
      salas = data;
      renderizarSalas(data);
    })
    .catch(erro => {
      console.error('Erro ao carregar salas:', erro);
      mostrarErro('lista-salas', 'Erro ao carregar salas');
    });
}

function renderizarSalas(listaSalas) {
  const container = document.getElementById('lista-salas');
  
  if (!listaSalas || listaSalas.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <h3>Nenhuma sala cadastrada</h3>
        <p>Adicione uma nova sala usando o formulário acima</p>
      </div>
    `;
    return;
  }

  container.innerHTML = listaSalas.map(sala => `
    <div class="card">
      <h3>${sala.nome}</h3>
      <p>ID: <strong>${sala.id}</strong></p>
      <div class="card-info">
        <span class="badge">
          👥 ${sala.capacidade} ${sala.capacidade === 1 ? 'pessoa' : 'pessoas'}
        </span>
      </div>
    </div>
  `).join('');
}

function adicionarSala() {
  const nome = document.getElementById('nomeSala').value.trim();
  const capacidade = document.getElementById('capacidadeSala').value;
  const mensagem = document.getElementById('mensagem-sala');

  if (!nome || !capacidade) {
    mostrarMensagem(mensagem, 'Por favor, preencha nome e capacidade', 'erro');
    return;
  }

  if (capacidade < 1) {
    mostrarMensagem(mensagem, 'Capacidade deve ser maior que 0', 'erro');
    return;
  }

  fetch('/api/salas', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ 
      nome, 
      capacidade: parseInt(capacidade) 
    })
  })
    .then(res => {
      if (!res.ok) throw new Error('Erro ao adicionar sala');
      return res.json();
    })
    .then(() => {
      mostrarMensagem(mensagem, 'Sala adicionada com sucesso!', 'sucesso');
      document.getElementById('nomeSala').value = '';
      document.getElementById('capacidadeSala').value = '';
      setTimeout(() => carregarSalas(), 1000);
    })
    .catch(erro => {
      console.error('Erro:', erro);
      mostrarMensagem(mensagem, 'Erro ao adicionar sala', 'erro');
    });
}

function preencherSelectSalas() {
  const select = document.getElementById('selectSala');
  
  if (!salas || salas.length === 0) {
    fetch('/api/salas')
      .then(res => res.json())
      .then(data => {
        salas = data;
        renderizarSelect(data, select);
      });
  } else {
    renderizarSelect(salas, select);
  }
}

function renderizarSelect(listaSalas, select) {
  select.innerHTML = '<option value="">Selecione uma sala</option>';
  select.innerHTML += listaSalas.map(sala => 
    `<option value="${sala.id}">${sala.nome} (${sala.capacidade} lugares)</option>`
  ).join('');

  select.addEventListener('change', () => {
    const salaId = select.value;
    if (salaId) {
      const sala = listaSalas.find(s => s.id === parseInt(salaId));
      document.getElementById('infoSala').style.display = 'block';
      document.getElementById('capaSala').textContent = sala.capacidade;
    } else {
      document.getElementById('infoSala').style.display = 'none';
    }
  });
}

function criarReserva() {
  const salaId = document.getElementById('selectSala').value;
  const inicio = document.getElementById('dataInicio').value;
  const fim = document.getElementById('dataFim').value;
  const mensagem = document.getElementById('mensagem-reserva');

  if (!salaId || !inicio || !fim) {
    mostrarMensagem(mensagem, 'Preencha todos os campos', 'erro');
    return;
  }

  if (new Date(inicio) >= new Date(fim)) {
    mostrarMensagem(mensagem, 'Data de início deve ser antes de fim', 'erro');
    return;
  }

  fetch('/api/reservas', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ 
      salaId: parseInt(salaId),
      inicio,
      fim
    })
  })
    .then(res => {
      if (!res.ok) return res.json().then(err => { throw err; });
      return res.json();
    })
    .then(() => {
      mostrarMensagem(mensagem, 'Reserva criada com sucesso!', 'sucesso');
      document.getElementById('selectSala').value = '';
      document.getElementById('dataInicio').value = '';
      document.getElementById('dataFim').value = '';
      document.getElementById('infoSala').style.display = 'none';
      setTimeout(() => carregarReservas(), 1000);
    })
    .catch(erro => {
      console.error('Erro:', erro);
      const msg = erro.erro || 'Erro ao criar reserva';
      mostrarMensagem(mensagem, msg, 'erro');
    });
}

function carregarReservas() {
  fetch('/api/reservas')
    .then(res => res.json())
    .then(data => renderizarReservas(data))
    .catch(erro => {
      console.error('Erro ao carregar reservas:', erro);
      mostrarErro('lista-reservas', 'Erro ao carregar reservas');
    });
}

function renderizarReservas(listaReservas) {
  const container = document.getElementById('lista-reservas');
  
  if (!listaReservas || listaReservas.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <h3>Nenhuma reserva agendada</h3>
        <p>Crie sua primeira reserva na aba "Criar Reserva"</p>
      </div>
    `;
    return;
  }

  container.innerHTML = listaReservas.map(reserva => {
    const sala = salas.find(s => s.id === reserva.salaId);
    const nomeSala = sala ? sala.nome : `Sala ${reserva.salaId}`;
    const dataInicio = new Date(reserva.inicio);
    const dataFim = new Date(reserva.fim);
    const dataInícioFormatada = dataInicio.toLocaleString('pt-BR');
    const dataFimFormatada = dataFim.toLocaleString('pt-BR');

    return `
      <div class="card">
        <h3>${nomeSala}</h3>
        <p>
          <strong>Início:</strong><br>
          ${dataInícioFormatada}
        </p>
        <p>
          <strong>Término:</strong><br>
          ${dataFimFormatada}
        </p>
        <div class="card-info">
          <span class="badge">ID: ${reserva.id}</span>
        </div>
      </div>
    `;
  }).join('');
}

function mostrarMensagem(elemento, texto, tipo) {
  elemento.textContent = texto;
  elemento.classList.remove('sucesso', 'erro');
  elemento.classList.add(tipo);
  elemento.style.display = 'block';

  setTimeout(() => {
    elemento.style.display = 'none';
  }, 5000);
}

function mostrarErro(elementId, mensagem) {
  const element = document.getElementById(elementId);
  element.innerHTML = `
    <div class="empty-state">
      <h3>Erro</h3>
      <p>${mensagem}</p>
    </div>
  `;
}
