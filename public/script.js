const botao = document.getElementById("btnCarregar");
const lista = document.getElementById("listaSalas");

botao.addEventListener("click", async () => {
  lista.innerHTML = "Carregando...";

  const resposta = await fetch("/api/salas");
  const salas = await resposta.json();

  lista.innerHTML = "";

  if (salas.length === 0) {
    lista.innerHTML = "<li>Nenhuma sala cadastrada</li>";
    return;
  }

  salas.forEach(sala => {
    const item = document.createElement("li");
    item.textContent = `ID ${sala.id} - ${sala.nome} (Capacidade: ${sala.capacidade})`;
    lista.appendChild(item);
  });
});
