const express = require('express');
const app = express();
const port = 4000;

const fs = require('fs');

const availableStocks = JSON.parse(
  fs.readFileSync(__dirname + '/data/availableStocks.json')
);
const singleStock = (symbol) =>
  JSON.parse(fs.readFileSync(__dirname + '/data/' + symbol + 'meta.json'));
const singleStockIntra = (symbol) =>
  JSON.parse(fs.readFileSync(__dirname + '/data/' + symbol + 'intra.json'));
const singleStockHistory = (symbol) =>
  JSON.parse(fs.readFileSync(__dirname + '/data/' + symbol + 'history.json'));
const availablePortfolio = (symbol) =>
  JSON.parse(fs.readFileSync(__dirname + '/data/' + symbol + 'data.json'));
const availablePortfolioList = JSON.parse(
  fs.readFileSync(__dirname + '/data/availablePortfolios.json')
);
app.get('/stocks', (req, res) => {
  console.log('all stocks being fethced');
  res.json(availableStocks);
});

app.get('/stocks/:symbol', (req, res) => {
  console.log(req.params.symbol + '-stock metadata being fethced');
  res.json(singleStock(req.params.symbol));
});

app.get('/stocks/:symbol/intraDay', (req, res) => {
  console.log(req.params.symbol + ' intraday being fetched');
  res.json(singleStockIntra(req.params.symbol));
});

app.get('/stocks/:symbol/history', (req, res) => {
  console.log(req.params.symbol + ' history being fetched');
  res.json(singleStockHistory(req.params.symbol));
});
app.get('/profile/portfolio', (req, res) => {
  console.log('All portfolios are being fetched');
  res.json(availablePortfolioList);
});
app.get('/profile/portfolio/:portfolioID', (req, res) => {
  console.log(req.params.portfolioID + ' data is being fetched');
  res.json(availablePortfolio(req.params.portfolioID));
});

app.post('/profile/portfolio', (req, res) => {
  console.log('Dummy POST');
  console.log(req.params);
  res.end();
});

app.listen(port, () => {
  console.log(`Dummy server listening on http://localhost:${port}`);
});
