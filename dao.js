const { all, insert, remove } = require("./db")

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

/**
 * 
 * @param {string} descrizione 
 * @param {number} price 
 * @param {string} dettagli 
 * @param {number} id 
 * @returns Promise<number>
 */
async function updateProdotto(descrizione, price, dettagli, id) {
  return await update('UPDATE prodotto SET descrizione = ?, price = ?, dettagli = ? WHERE id = ?', [descrizione, price, dettagli, id]);
}

/**
 * 
 * @param {id} number 
 * @returns Promise<any>
 */
async function getProdotto(id) {
  let prodotto;
  const prodotti=await listaProdotti()
  for(let i=0; i<prodotti.length; i++){
    if (prodotti[i].id == id){
      prodotto=prodotti[i]
      break;
    }
  }
  return prodotto;
 // return await get('SELECT * FROM prodotto WHERE id = ?', [id]);
}

/**
 * 
 * @param {id} number 
 * @returns Promise<any>
 */
async function deleteProdotto(id) {
  return await remove('DELETE FROM prodotto WHERE id = ?)', [id]);
}



module.exports = {
  listaProdotti,
  insertProdotto,
  deleteProdotto,
  getProdotto,
  updateProdotto
}