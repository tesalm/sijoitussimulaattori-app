import { Dispatch } from 'redux';

import {
  StockListApiRequest,
  stockMetaApiRequest,
  stockIntraApiRequest,
  stockHistoryApiRequest,
} from '../utils/api';
import { Stock, StockMetadata, HistoryData, Intraday } from './reducers';

export enum ActionType {
  RequestStocksBegin = '[Stocks] API Request',
  RefreshStocksBegin = '[Stocks] Refresh API Request',
  RequestStocksSuccess = '[Stocks] API Success',
  RequestStocksFailure = '[Stocks] API Failure',
  SaveSymbol = '[Stocks] Save Active Stock Symbol',
  UpdateStockData = '[Stocks] Update Stock Data',
  GetStockMetadataBegin = '[Stocks] StockMetadata begin',
  GetStockMetadataSuccess = '[Stocks] StockMetadata success',
  GetStockMetadataFailure = '[Stocks] StockMetadata failure',
  GetIntradayBegin = '[Stocks] Intraday begin',
  GetIntradaySuccess = '[Stocks] Intraday success',
  GetIntradayFailure = '[Stocks] Intraday failure',
  RefreshIntradayBegin = '[Stocks] Intraday begin refresh',
  RefreshIntradaySuccess = '[Stocks] Intraday refresh success',
  RefreshIntradayFailure = '[Stocks] Intraday refresh failure',
  GetHistoryBegin = '[Stocks] History begin',
  GetHistorySuccess = '[Stocks] History success',
  GetHistoryFailure = '[Stocks] History failure',
}

export type StockAction =
  | RequestStocksBegin
  | RefreshStocksBegin
  | RequestStocksSuccess
  | RequestStocksFailure
  | SaveSymbol
  | GetStockMetadataBegin
  | GetStockMetadataSuccess
  | GetStockMetadataFailure
  | GetIntradayBegin
  | GetIntradaySuccess
  | GetIntradayFailure
  | RefreshIntradayBegin
  | RefreshIntradaySuccess
  | RefreshIntradayFailure
  | GetHistoryBegin
  | GetHistorySuccess
  | GetHistoryFailure;

export class RequestStocksBegin {
  readonly type = ActionType.RequestStocksBegin;
  constructor() {
    return { type: this.type };
  }
}

export class RequestStocksSuccess {
  readonly type = ActionType.RequestStocksSuccess;
  constructor(public stocks: Array<Stock>) {
    return { type: this.type, stocks };
  }
}

export class RequestStocksFailure {
  readonly type = ActionType.RequestStocksFailure;
  constructor(public error: Error) {
    return { type: this.type, error };
  }
}

export class RefreshStocksBegin {
  readonly type = ActionType.RefreshStocksBegin;
  constructor() {
    return { type: this.type };
  }
}

export class SaveSymbol {
  readonly type = ActionType.SaveSymbol;
  constructor(public symbol: string) {
    return { type: this.type, symbol };
  }
}

export class GetStockMetadataBegin {
  readonly type = ActionType.GetStockMetadataBegin;
  constructor(public stocks: Array<Stock>, public currentStock: Stock) {
    return { type: this.type, stocks, currentStock };
  }
}

export class GetStockMetadataSuccess {
  readonly type = ActionType.GetStockMetadataSuccess;
  constructor(
    public stocks: Array<Stock>,
    public currentStock: Stock,
    public metaData: StockMetadata
  ) {
    return { type: this.type, stocks, currentStock, metaData };
  }
}

export class GetStockMetadataFailure {
  readonly type = ActionType.GetStockMetadataFailure;
  constructor(
    public stocks: Array<Stock>,
    public currentStock: Stock,
    public error: Error
  ) {
    return { type: this.type, stocks, currentStock, error };
  }
}

export class GetIntradayBegin {
  readonly type = ActionType.GetIntradayBegin;
  constructor(public stocks: Array<Stock>, public currentStock: Stock) {
    return { type: this.type, stocks, currentStock };
  }
}

export class GetIntradaySuccess {
  readonly type = ActionType.GetIntradaySuccess;
  constructor(
    public stocks: Array<Stock>,
    public currentStock: Stock,
    public intraData: Intraday
  ) {
    return { type: this.type, stocks, currentStock, intraData };
  }
}

export class GetIntradayFailure {
  readonly type = ActionType.GetIntradayFailure;
  constructor(
    public stocks: Array<Stock>,
    public currentStock: Stock,
    public error: Error
  ) {
    return { type: this.type, stocks, currentStock, error };
  }
}

export class RefreshIntradayBegin {
  readonly type = ActionType.RefreshIntradayBegin;
  constructor(public stocks: Stock[], public currentStock: Stock) {
    return { type: this.type, stocks, currentStock };
  }
}

export class RefreshIntradaySuccess {
  readonly type = ActionType.RefreshIntradaySuccess;
  constructor(
    public stocks: Array<Stock>,
    public currentStock: Stock,
    public intraData: Intraday,
  ) {
    return { type: this.type, stocks, currentStock, intraData };
  }
}

export class RefreshIntradayFailure {
  readonly type = ActionType.RefreshIntradayFailure;
  constructor(
    public stocks: Array<Stock>,
    public currentStock: Stock,
    public error: Error
  ) {
    return { type: this.type, stocks, currentStock, error };
  }
}

export class GetHistoryBegin {
  readonly type = ActionType.GetHistoryBegin;
  constructor(public stocks: Array<Stock>, public currentStock: Stock) {
    return { type: this.type, stocks, currentStock };
  }
}

export class GetHistorySuccess {
  readonly type = ActionType.GetHistorySuccess;
  constructor(
    public stocks: Stock[],
    public currentStock: Stock,
    public historyData: HistoryData
  ) {
    return { type: this.type, stocks, currentStock, historyData };
  }
}
export class GetHistoryFailure {
  readonly type = ActionType.GetHistoryFailure;
  constructor(
    public stocks: Array<Stock>,
    public currentStock: Stock,
    public error: Error
  ) {
    return { type: this.type, stocks, currentStock, error };
  }
}

// API-request for getting stocks.
const getStocks = () => async (dispatch: Dispatch<StockAction>) => {
  dispatch(new RequestStocksBegin());
  try {
    const data = await StockListApiRequest();
    data.forEach((stock) => {
      stock.stockInfo = {
        metaLoading: false,
        intraLoading: false,
        historyLoading: false,
        refreshing: false,
      };
    });
    dispatch(new RequestStocksSuccess(data));
  } catch (error) {
    dispatch(new RequestStocksFailure(error));
  }
};

// Called when user manually refreshes the MarketScreen
// (for example by swiping down)
const refreshStocks = () => async (dispatch: Dispatch<StockAction>) => {
  dispatch(new RefreshStocksBegin());
  try {
    const data = await StockListApiRequest();
    data.forEach((stock) => {
      stock.stockInfo = {
        metaLoading: false,
        intraLoading: false,
        historyLoading: false,
        refreshing: false,
      };
    });
    dispatch(new RequestStocksSuccess(data));
  } catch (error) {
    dispatch(new RequestStocksFailure(error));
  }
};

// Saves the symbol of a stock that is shown to the user.
const saveStockSymbol = (symbol: string) => async (
  dispatch: Dispatch<StockAction>
) => {
  dispatch(new SaveSymbol(symbol));
};

// API-request for getting metadata for single stock.
const getStockMetadata = (
  stockList: Array<Stock>,
  symbol: string,
  curTime: Date
) => async (dispatch: Dispatch<StockAction>) => {
  var stocks = stockList.slice(0);
  var stock = getStock(stocks, symbol);
  if (stock) {
    // Metadata is being fetched once a day, if not undefined.
    if (
      stock.stockInfo === undefined ||
      stock.stockInfo.stockMetadata === undefined ||
      onceADayRefreshrateDated(curTime, stock.stockInfo.stockMetadata.fetchTime)
    ) {
      dispatch(new GetStockMetadataBegin(stocks, stock));
      try {
        const meta = await stockMetaApiRequest(symbol);
        meta.fetchTime = curTime;
        dispatch(new GetStockMetadataSuccess(stocks, stock, meta));
      } catch (error) {
        dispatch(new GetStockMetadataFailure(stocks, stock, error));
      }
    }
  }
};

// API-request for getting intraday-data.
const getIntraday = (
  stockList: Array<Stock>,
  symbol: string,
  curTime: Date
) => async (dispatch: Dispatch<StockAction>) => {
  var stocks = stockList.slice(0);
  var stock = getStock(stocks, symbol);
  if (stock) {
    // Intraday is fetched several times a day.
    if (
      stock.stockInfo === undefined ||
      stock.stockInfo.intraday === undefined ||
      refreshrateDated(curTime, stock.stockInfo.intraday.fetchTime)
    ) {
      dispatch(new GetIntradayBegin(stocks, stock));
      try {
        const intraData = {
          intradayElement: await stockIntraApiRequest(symbol),
          fetchTime: curTime,
        };
        dispatch(new GetIntradaySuccess(stocks, stock, intraData));
      } catch (error) {
        dispatch(new GetIntradayFailure(stocks, stock, error));
      }
    }
  }
};

// API-request for getting intraday-data. Called only when user refreshes
// the screen manually (for example swiping down).
const refreshIntraday = (
  stockList: Array<Stock>,
  symbol: string,
  curTime: Date
) => async (dispatch: Dispatch<StockAction>) => {
  var stocks = stockList.slice(0);
  var stock = getStock(stocks, symbol);
  if (stock) {
    if (stock.stockInfo === undefined || stock.stockInfo.intraday === undefined ||
      refreshrateDated(curTime, stock.stockInfo.intraday.fetchTime)
      ) {
      dispatch(new RefreshIntradayBegin(stocks, stock));
      try {
        const intraData = {
          intradayElement: await stockIntraApiRequest(symbol),
          fetchTime: curTime,
        };
        dispatch(new RefreshIntradaySuccess(stocks, stock, intraData));
      } catch (error) {
        dispatch(new RefreshIntradayFailure(stocks, stock, error));
      }
    }
  }
};

// API-request for getting historydata
const getHistory = (
  stockList: Array<Stock>,
  symbol: string,
  curTime: Date
) => async (dispatch: Dispatch<StockAction>) => {
  var stocks = stockList.slice(0);
  var stock = getStock(stocks, symbol);
  if (stock) {
    // Historydata is being refreshed once a day, if not undefined.
    if (
      stock.stockInfo === undefined ||
      stock.stockInfo.historyData === undefined ||
      onceADayRefreshrateDated(curTime, stock.stockInfo.historyData.fetchTime)
    ) {
      dispatch(new GetHistoryBegin(stocks, stock));
      try {
        const historyData = {
          historyDataElement: await stockHistoryApiRequest(symbol),
          fetchTime: curTime,
        };
        dispatch(new GetHistorySuccess(stocks, stock, historyData));
      } catch (error) {
        dispatch(new GetHistoryFailure(stocks, stock, error));
      }
    }
  }
};

// Helper functions:
const getStock = (stockList: Stock[], symbol: string) => {
  return stockList.find((stock) => {
    return stock.symbol === symbol;
  });
};

// Checks if metadata and historydata should be updated (they should be updated once a day)
function onceADayRefreshrateDated(curTime: Date, fetchTime: Date): boolean {
  // TODO: Set updateTime (once a day). Now 00:30.00
  const updateTimeH = 0;
  const updateTimeM = 30;
  const updateTimeS = 0;

  // If curTime > 00:30.00
  if (
    curTime.getHours() >= updateTimeH &&
    curTime.getMinutes() >= updateTimeM &&
    curTime.getSeconds() >= updateTimeS
  ) {
    // If data has been fetched the day before or fetchTime < updateTime, refresh data
    if (
      curTime.getDate() != fetchTime.getDate() ||
      (fetchTime.getHours() <= updateTimeH &&
        fetchTime.getMinutes() <= updateTimeM &&
        fetchTime.getSeconds() <= updateTimeS)
    ) {
      return true;
    }
  }
  return false;
}

// Checks if intraday should be updated (intraday is updated many times a day)
function refreshrateDated(curTime: Date, fetchTime: Date): boolean {
  const curTime_ms = curTime.getTime();
  const intraTime_ms = fetchTime.getTime();
  // TODO: Set refreshrate. Now 5 minutes.
  if (curTime_ms - intraTime_ms > 1000 * 60 * 5) {
    return true;
  }
  return false;
}

export {
  getStocks,
  refreshStocks,
  saveStockSymbol,
  getStockMetadata,
  getIntraday,
  refreshIntraday,
  getHistory,
};
