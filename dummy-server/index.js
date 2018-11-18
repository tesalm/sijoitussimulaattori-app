const express = require('express');
const app = express();
const port = 3000;

const fs = require('fs');

const availableStocks = JSON.parse(fs.readFileSync(__dirname + '/data/availableStocks.json'));

app.get('/stocks/list', (req, res) => {
  console.log("Connected...")
  res.json(availableStocks);
})

app.get('/stocks/list/:key', (req, res) => {
  for (x in availableStocks.bestMatches) {
    if (availableStocks.bestMatches[x]["1. symbol"] === req.params.key) {
      res.json(availableStocks.bestMatches[x])
    }
  }
})

app.listen(port, () => {
  console.log(`Dummy server listening on http://localhost:${port}`)
})
