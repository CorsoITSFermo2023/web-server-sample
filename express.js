const express = require('express')
const bodyParser = require('body-parser');
const { initStruct } = require('./init-struct');
const { listaProdotti, insertProdotto, getProdotto, deleteProdotto, updateProdotto } = require('./dao');
const port = 3000;

const app = express();

app.get('/', function (req, res) {
  const risposta = {
    message: 'Benvenuti tutti'
  };
  res.json(risposta)
});



app.use(bodyParser.json());

app.get('/list', async (req, res) => {
  const acaso = await listaProdotti();
  res.json(acaso);
})

app.get('/:idProdotto', async (req, res) => {
  const id =req.params.idProdotto

  const prodotto= await getProdotto(id)
  res.json(prodotto)

})

app.post('/', async (req, res) => {
  const newId = await insertProdotto(req.body.descrizione, req.body.price, req.body.dettagli)
  res.json(newId);
});

app.put('/:idProdotto', async (req, res) => {
  const nuovo= await updateProdotto(req.body.descrizione,req.body.price,req.body.dettagli,req.params.idProdotto)
  const risposta = {
    message: 'prodotto modificato',
    nuovoprodotto: nuovo
  };
  res.json(risposta)
});

app.patch('/:idProdotto', async (req,res) => {
  let desc =req.body.descrizione
  let prezzo= req.body.price
  let dett= req.body.dettagli

  prodotto= await getProdotto(req.params.idProdotto)
  
  if(!req.body.descrizione)
    desc=prodotto.descrizione
  if(!req.body.price)
    prezzo=prodotto.price
  if(!req.body.dettagli)
    dett=prodotto.dettagli


  const nuovo= await updateProdotto(desc,prezzo,dett,req.params.idProdotto)
  const risposta = {
    message: 'prodotto modificato',
    nuovoprodotto: nuovo
  };
  res.json(risposta)
})

app.delete('/:idProdotto', (req, res) => {
  const aggiorna= deleteProdotto(req.params.idProdotto)
  const risposta = {
    message: 'prodotto eliminato'
  };
  res.json(aggiorna)
});




initStruct().then(
  () => app.listen(port)
);
