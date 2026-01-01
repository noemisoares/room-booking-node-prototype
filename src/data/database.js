const fs = require("fs");
const path = require("path");

const databasePath = path.join(__dirname, "database.json");

function lerBanco() {
  const data = fs.readFileSync(databasePath, "utf-8");
  return JSON.parse(data);
}

function salvarBanco(data) {
  fs.writeFileSync(databasePath, JSON.stringify(data, null, 2));
}

module.exports = {
  lerBanco,
  salvarBanco
};
