const express = require("express");
const path = require("path");
const cors = require("cors");

const salasRoutes = require("./routes/salas.routes");
const reservasRoutes = require("./routes/reservas.routes");

const app = express();

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, "../public")));

app.use("/api/salas", salasRoutes);
app.use("/api/reservas", reservasRoutes);

module.exports = app;
