const express = require('express');
const app = express();
const port = 3000;

const fs = require('fs');

const availableStocks = JSON.parse(fs.readFileSync(__dirname + '/data/availableStocks.json'));
const singleStock = (symbol) =>
  JSON.parse(fs.readFileSync(__dirname + '/data/' + symbol + '.json'));

app.get('/stocks/list', (req, res) => {
  console.log("Connected...");
  res.json(availableStocks);
});

app.get('/stocks/list/:symbol', (req, res) => {
  console.log(req.params.symbol + '-stock being fethced');
  res.json(singleStock(req.params.symbol));
});

app.listen(port, () => {  console.log(`Dummy server listening on http://localhost:${port}`);
});
