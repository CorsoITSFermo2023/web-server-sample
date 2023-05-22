const { run } = require("./db");

async function initStruct() {
  await run('CREATE TABLE IF NOT EXISTS prodotto (id INTEGER PRIMARY KEY AUTOINCREMENT, descrizione STRING, price REAL, dettagli STRING)');
}

module.exports = {
  initStruct
}