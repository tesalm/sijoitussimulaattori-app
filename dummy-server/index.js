const express = require('express');
const app = express();
const port = 3000;

const fs = require('fs');

const availableStocks = JSON.parse(fs.readFileSync(__dirname + '/data/availableStocks.json'));

app.get('/stocks/list', (req, res) => {
  res.json(availableStocks);
})

app.listen(port, () => {
  console.log(`Dummy server listening on http://localhost:${port}`)
})