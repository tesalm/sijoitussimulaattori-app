const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 4000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

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
const portfolioTransactions = (portfolioId) =>
  JSON.parse(fs.readFileSync(__dirname + '/data/' + portfolioId + 'transacts.json'));

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
app.get('/profile/portfolio/:portfolioId/transaction', (req, res) => {
  console.log('transactions of portfolio #' + req.params.portfolioId + ' being fetched');
  res.json(portfolioTransactions(req.params.portfolioId));
});
app.delete('/profile/portfolio/:portfolioId/transaction/:transactionId', (req, res) => {
  console.log('transaction #' + req.params.transactionId + 
              ' deleted from portfolio #' + req.params.portfolioId);
  res.json({uid: req.params.transactionId});
});

app.post('/profile/portfolio/:portfolioId/transaction', (req, res) => {
  const transaction = {
    uid: '1' + req.body.amount,
    type: 'SELL',
    symbol: 'AAPL',
    amount: 56,
    price: 700,
    expiresAt: '2019-11-0305:00:00',
    fulfilledAt: '',
    cancelledAt: '',
  };
  res.json(transaction);
});

app.post('/profile/portfolio', (req, res) => {
  const portfolio = {
    uid: '1' + req.body.name,
    name: req.body.name,
    balance: req.body.balance,
    ownerId: '',
  };
  res.json(portfolio);
});

app.listen(port, () => {
  console.log(`Dummy server listening on http://localhost:${port}`);
});
