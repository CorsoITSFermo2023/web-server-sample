const { all, insert } = require("./db")

/**
 * 
 * @returns {Promise<Array<any>>}
 */
async function listaProdotti() {
  return await all('SELECT * FROM prodotto');
}

/**
 * 
 * @param {string} descrizione 
 * @param {number} price 
 * @param {string} dettagli 
 * @returns 
 */
async function insertProdotto(descrizione, price, dettagli) {
  return await insert('INSERT INTO prodotto (descrizione, price, dettagli) values (?, ? ,?)', [descrizione, price, dettagli]);
}

module.exports = {
  listaProdotti,
  insertProdotto
}