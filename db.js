const { Database } = require('sqlite3');

const db = new Database('sample.db');

/**
 * 
 * @param {string} query 
 * @param {any[]} param 
 * @returns Promise<any>
 */
const get = (query, param) => {
  return new Promise((resolve, reject) => {
    db.get(query, param, (err, row) => {
      if(err) {
        reject(err);
      } else {
        resolve(row);
      }
    })
  })
}

/**
 * 
 * @param {string} query 
 * @param {any[]} param 
 * @returns Promise<any[]>
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
 * @returns Promise<any>
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
 * @returns Promise<number | undefined>
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

/**
 * 
 * @param {string} query 
 * @param {any[]} param 
 * @returns Promise<number>
 */
const update = (query, param) => {
  return new Promise((resolve, reject) => {
    db.run(query, param, function (err, rows) {
      if(err) {
        reject(err);
      } else {
        resolve(this.changes);
      }
    })
  })
}

const remove = update;

module.exports = {
  all,
  run,
  insert,
  update,
  remove, 
  get
}