const { Database } = require('sqlite3');

const db = new Database('sample.db');

/**
 * 
 * @param {string} query 
 * @param {any[]} param 
 * @returns any[]
 */
const all = (query, param) => {
  return new Promise((resolve, reject) => {
    db.all(query, param, (err, rows) => {
      if(err) {
        reject(err);
      } else {
        resolve(rows);
      }
    })
  })
}

/**
 * 
 * @param {string} query 
 * @param {any[]} param 
 * @returns any
 */
const run = (query, param) => {
  return new Promise((resolve, reject) => {
    db.run(query, param, (err, rows, other) => {
      if(err) {
        reject(err);
      } else {
        resolve(rows);
      }
    })
  })
}

/**
 * 
 * @param {string} query 
 * @param {any[]} param 
 * @returns any
 */
const insert = (query, param) => {
  return new Promise((resolve, reject) => {
    db.run(query, param, function (err, rows) {
      if(err) {
        reject(err);
      } else {
        resolve(this.lastID);
      }
    })
  })
}



module.exports = {
  all,
  run,
  insert
}