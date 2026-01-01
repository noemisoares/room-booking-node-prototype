<p align="center">
  <strong>
    Português
    &nbsp;|&nbsp;
    <a href="./README.en.md">English</a>
  </strong>
</p>

# Room Booking System

Sistema completo de **reserva de salas**, desenvolvido em **Node.js**, com backend estruturado, regras de negócio sólidas e frontend moderno para demonstração funcional. Projeto demonstrativo focado em **lógica de reservas**, **APIs REST** e **validações críticas de negócio**.

---

## 🧠 Objetivo do Projeto

Este projeto foi desenvolvido como:

- Protótipo funcional de sistema de reservas de salas
- Demonstração de regras de negócio reais
- Exemplo de API REST bem estruturada
- Base sólida para futuras evoluções  
  (ex: autenticação, banco de dados relacional, permissões)

---

## 🛠 Tecnologias Utilizadas

- Node.js
- JavaScript
- HTML5
- CSS3
- JSON
- Git
- GitHub

---

## 📸 Demonstração

As imagens abaixo representam o funcionamento real do sistema:

![Salas cadastradas](./images/home.png)
![Criar reservas](./images/criar.png)
![Reservas](./images/reservas.png)

---

## 🚀 Funcionalidades

### Backend (API REST)
- Estrutura organizada em controllers, routes e services
- Endpoints REST completos para salas e reservas
- Validação obrigatória de dados no backend
- Impedimento de sobreposição de reservas
- Validação de datas (não permite reservas no passado)
- Detecção de conflito de horário em tempo real
- Retorno correto de erros HTTP (`409 Conflict`)
- Banco de dados em JSON funcional (prototipagem)

### Regras de negócio
- Uma sala não pode ser reservada em horários conflitantes
- Conflitos são detectados com precisão
- Backend nunca permite dados inválidos
- Frontend reflete erros e sucessos corretamente

---

## 🎨 Frontend

- Interface moderna e profissional
- Design com gradiente visual
- Sistema de abas interativas
- Cards responsivos
- Formulários intuitivos com validação
- Feedback visual de sucesso e erro
- Seletor visual de salas
- Listagem clara e organizada de reservas
- Interface totalmente em português

---

## 🧪 Testes Realizados

- GET `/api/salas`
- POST `/api/salas`
- GET `/api/reservas`
- POST `/api/reservas`
- Validação de conflito de horário
- Detecção correta de sobreposição de reservas
- Integração completa entre frontend e backend
- Servidor funcionando corretamente

---

## ▶️ Como Executar o Projeto

### 1️⃣ Instalar as dependências
```bash
npm install
```
### 2️⃣ Iniciar o servidor
```bash
npm start
```
### 3️⃣ Acessar no navegador
```bash
http://localhost:3000
```
