const express = require('express')
const bodyParser = require('body-parser');
const { initStruct } = require('./init-struct');
const { listaProdotti, insertProdotto, updateProdotto, deleteProdotto, getProdotto } = require('./dao');
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

app.get('/:idProdotto', async (req, res) => {
  const id = await getProdotto(req.params.idProdotto);
  res.json(id);
  
})

app.post('/', async (req, res) => {
  const newId = await insertProdotto(req.body.descrizione, req.body.price, req.body.dettagli)
  res.json(newId);
});

app.put('/:idProdotto', async(req, res) => {
  const newId = await updateProdotto(req.body.descrizione, req.body.price, req.body.dettagli , req.params.idProdotto)
  res.json(newId);
});

app.delete('/:idProdotto', async(req, res) => {
  const newId= await deleteProdotto(req.params.idProdotto)
  res.json(newId);
});


initStruct().then(
  () => app.listen(port)
);
