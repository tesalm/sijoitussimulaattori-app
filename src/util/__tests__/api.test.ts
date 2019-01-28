import nock from 'nock';

import { config } from '../../config';
import { DailyQuote, Stock, StockMetadata } from '../../MarketScreen/reducer';
import { stockHistoryApiRequest, stockIntradayApiRequest, stockListApiRequest, stockMetaApiRequest } from '../api';

const mockStockListData: Stock[] = [
  {
    symbol: 'FOO',
    name: 'Foo inc.',
    high: 100,
    low: 20,
    revenue: 0.01,
    close: 99,
  },
  {
    symbol: 'BAR',
    name: 'Bar inc.',
    high: 140,
    low: 10,
    revenue: 0.04,
    close: 78,
  },
];

const mockStockMetaData: StockMetadata = {
  symbol: 'FOO',
  name: 'Foo inc.',
  type: 'equity',
  region: 'US/America',
  marketOpen: '06:30',
  marketClose: '16:30',
  timeZone: 'UTC+03',
  currency: 'USD',
  fetchTime: new Date('2019-01-04T00:00:00.000Z'),
};

const mockStockHistory: DailyQuote[] = [
  {
    symbol: 'FOO',
    date: '2019-01-04T00:00:00.000Z',
    open: 50,
    high: 100,
    low: 20,
    close: 99,
    volume: 30000,
  },
  {
    symbol: 'FOO',
    date: '2019-01-03T00:00:00.000Z',
    open: 54,
    high: 110,
    low: 23,
    close: 50,
    volume: 3050,
  },
];

const dailyQuoteIntradayDates = [
  '2019-01-04T15:50:00.000Z',
  '2019-01-04T15:45:00.000Z',
];

const mockStockIntraday: DailyQuote[] = mockStockHistory.map((quote, i) => ({
  ...quote,
  date: dailyQuoteIntradayDates[i],
}));

describe('API client', () => {
  it('should get stockdata or throw an error', async () => {
    nock(config.app.STOCK_API_URL)
      .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
      .get('/stocks')
      .reply(200, mockStockListData);

    const data = await stockListApiRequest();
    expect(data).toStrictEqual(mockStockListData);

    nock(config.app.STOCK_API_URL)
      .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
      .get('/stocks')
      .reply(500, 'Cannot call twice!');

    try {
      await stockListApiRequest();

      // This should never happen:
      expect(true).toBe(false);
    } catch (err) {
      const error: Error = err;
      expect(error.message).toEqual('Request failed with status code 500');
    }
  });

  it('should get stock meta data or throw an error', async () => {
    nock(config.app.STOCK_API_URL)
      .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
      .get('/stocks/FOO')
      .reply(200, mockStockMetaData);

    const data = await stockMetaApiRequest('FOO');
    expect(data).toStrictEqual({
      ...mockStockMetaData,
      // The server returns dates as strings:
      fetchTime: '2019-01-04T00:00:00.000Z',
    });

    nock(config.app.STOCK_API_URL)
      .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
      .get('/stocks/BAR')
      .reply(404, 'Not found');

    try {
      await stockMetaApiRequest('BAR');

      // This should never happen:
      expect(true).toBe(false);
    } catch (err) {
      const error: Error = err;
      expect(error.message).toEqual('Request failed with status code 404');
    }
  });

  it('should get stock history data or throw an error', async () => {
    nock(config.app.STOCK_API_URL)
      .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
      .get('/stocks/FOO/history')
      .reply(200, mockStockHistory);

    const data = await stockHistoryApiRequest('FOO');
    expect(data).toStrictEqual(mockStockHistory);

    nock(config.app.STOCK_API_URL)
      .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
      .get('/stocks/BAR/history')
      .reply(404, 'Not found');

    try {
      await stockHistoryApiRequest('BAR');

      // This should never happen:
      expect(true).toBe(false);
    } catch (err) {
      const error: Error = err;
      expect(error.message).toEqual('Request failed with status code 404');
    }
  });

  it('should get stock intraday data or throw an error', async () => {
    nock(config.app.STOCK_API_URL)
      .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
      .get('/stocks/FOO/intraday')
      .reply(200, mockStockIntraday);

    const data = await stockIntradayApiRequest('FOO');
    expect(data).toStrictEqual(mockStockIntraday);

    nock(config.app.STOCK_API_URL)
      .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
      .get('/stocks/BAR/intraday')
      .reply(404, 'Not found');

    try {
      await stockIntradayApiRequest('BAR');

      // This should never happen:
      expect(true).toBe(false);
    } catch (err) {
      const error: Error = err;
      expect(error.message).toEqual('Request failed with status code 404');
    }
  });
});
