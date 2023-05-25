const express = require('express')
const bodyParser = require('body-parser');
const { initStruct } = require('./init-struct');
const { listaProdotti, insertProdotto } = require('./dao');
const rotteBelle = require('./rotte-belle');
const rotteBrutte = require('./rotte-brutte');
const port = 3000;

const app = express();

app.use((req, res, next) => {
  console.log('uno');
  next();
});

app.use((req, res, next) => {
  console.log('due');
  next();
});

app.get('/', function (req, res) {
  const risposta = {
    message: 'Benvenuti tutti'
  };
  res.json(risposta)
});

app.use((req, res, next) => {
  console.log('tre');
  next();
});

app.use((req, res, next) => {
  console.log(req.path);
  next();
});

app.use(bodyParser.json());

app.get('/list', async (req, res) => {
  // listaProdotti()
  const acaso = await listaProdotti();
  console.log(acaso);
  res.json(acaso);

  // alternativa
/*   listaProdotti().then(
    acaso => res.json(acaso) 
  ); */
})

app.get('/:idProdotto', (req, res) => {
  req.params.idProdotto
  // TODO fare la logica
})

app.post('/', async (req, res) => {
  const newId = await insertProdotto(req.body.descrizione, req.body.price, req.body.dettagli)
  res.json(newId);
});

app.put('/:idProdotto', (req, res) => {

});

app.delete('/:idProdotto', (req, res) => {

});

app.use('/rotte-belle', rotteBelle)
app.use('/rotte-brutte', rotteBrutte)

initStruct().then(
  () => app.listen(port)
);
