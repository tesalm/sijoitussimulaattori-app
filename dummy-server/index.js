const express = require('express');
const app = express();
const port = 3000;

const fs = require('fs');

const availableStocks = JSON.parse(fs.readFileSync(__dirname + '/data/availableStocks.json'));

app.get('/stocks/list', (req, res) => {
  res.json(availableStocks);
})

app.get('/stocks/list/:key', (req, res) => {
  for (x in availableStocks.bestMatches) {
    if (availableStocks.bestMatches[x]["key"] === req.params.key) {
      res.json(availableStocks.bestMatches[x]);
      break;
    }
  }
})

app.listen(port, () => {
  console.log(`Dummy server listening on http://localhost:${port}`)
})
