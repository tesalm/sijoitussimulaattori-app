const express = require('express');
const app = express();
const port = 3000;

const fs = require('fs');

const availableStocks = JSON.parse(
  fs.readFileSync(__dirname + '/data/availableStocks.json')
);
const singleStock = (key) =>
  JSON.parse(fs.readFileSync(__dirname + '/data/' + key + '.json'));

app.get('/stocks/list', (req, res) => {
  console.log('Connected...');
  res.json(availableStocks);
});

app.get('/stocks/list/:key', (req, res) => {
  console.log(req.params.key);
  res.json(singleStock(req.params.key));
});

app.listen(port, () => {
  console.log(`Dummy server listening on http://localhost:${port}`);
});
