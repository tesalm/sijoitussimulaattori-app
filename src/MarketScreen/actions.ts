import { Dispatch } from 'redux';

import {
  StockListApiRequest,
  stockMetaApiRequest,
  stockIntraApiRequest,
  stockHistoryApiRequest,
} from '../utils/api';
import {
  Stock,
  StockMetadata,
  HistoryData,
  Intraday,
  IntradayQuote,
  HistoryDataQuote,
} from './reducers';

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
  constructor(public symbol: string) {
    return { type: this.type, symbol };
  }
}

export class GetStockMetadataSuccess {
  readonly type = ActionType.GetStockMetadataSuccess;
  constructor(
    public symbol: string,
    public metaData: StockMetadata,
    public fetchTime: Date
  ) {
    return { type: this.type, symbol, metaData, fetchTime };
  }
}

export class GetStockMetadataFailure {
  readonly type = ActionType.GetStockMetadataFailure;
  constructor(public symbol: string, public error: Error) {
    return { type: this.type, symbol, error };
  }
}

export class GetIntradayBegin {
  readonly type = ActionType.GetIntradayBegin;
  constructor(public symbol: string) {
    return { type: this.type, symbol };
  }
}

export class GetIntradaySuccess {
  readonly type = ActionType.GetIntradaySuccess;
  constructor(
    public symbol: string,
    public intraData: IntradayQuote[],
    public fetchTime: Date
  ) {
    return { type: this.type, symbol, intraData, fetchTime };
  }
}

export class GetIntradayFailure {
  readonly type = ActionType.GetIntradayFailure;
  constructor(public symbol: string, public error: Error) {
    return { type: this.type, symbol, error };
  }
}

export class RefreshIntradayBegin {
  readonly type = ActionType.RefreshIntradayBegin;
  constructor(public symbol: string) {
    return { type: this.type, symbol };
  }
}

export class RefreshIntradaySuccess {
  readonly type = ActionType.RefreshIntradaySuccess;
  constructor(
    public symbol: string,
    public intraData: IntradayQuote[],
    public fetchTime: Date
  ) {
    return { type: this.type, symbol, intraData, fetchTime };
  }
}

export class RefreshIntradayFailure {
  readonly type = ActionType.RefreshIntradayFailure;
  constructor(public symbol: string, public error: Error) {
    return { type: this.type, symbol, error };
  }
}

export class GetHistoryBegin {
  readonly type = ActionType.GetHistoryBegin;
  constructor(public symbol: string) {
    return { type: this.type, symbol };
  }
}

export class GetHistorySuccess {
  readonly type = ActionType.GetHistorySuccess;
  constructor(
    public symbol: string,
    public historyData: HistoryDataQuote[],
    public fetchTime: Date
  ) {
    return { type: this.type, symbol, historyData, fetchTime };
  }
}
export class GetHistoryFailure {
  readonly type = ActionType.GetHistoryFailure;
  constructor(public symbol: string, public error: Error) {
    return { type: this.type, symbol, error };
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
  stock: Stock,
  symbol: string,
  curTime: Date
) => async (dispatch: Dispatch<StockAction>) => {
  if (stock) {
    // Metadata is being fetched once a day, if not undefined.
    if (
      stock.stockInfo === undefined ||
      stock.stockInfo.stockMetadata === undefined ||
      onceADayRefreshrateDated(curTime, stock.stockInfo.stockMetadata.fetchTime)
    ) {
      dispatch(new GetStockMetadataBegin(symbol));
      try {
        const meta = await stockMetaApiRequest(symbol);
        dispatch(new GetStockMetadataSuccess(symbol, meta, curTime));
      } catch (error) {
        dispatch(new GetStockMetadataFailure(symbol, error));
      }
    }
  }
};

// API-request for getting intraday-data.
const getIntraday = (stock: Stock, symbol: string, curTime: Date) => async (
  dispatch: Dispatch<StockAction>
) => {
  if (stock) {
    // Intraday is fetched several times a day.
    if (
      stock.stockInfo === undefined ||
      stock.stockInfo.intraday === undefined ||
      refreshrateDated(curTime, stock.stockInfo.intraday.fetchTime)
    ) {
      dispatch(new GetIntradayBegin(symbol));
      try {
        const intraData = await stockIntraApiRequest(symbol);
        dispatch(new GetIntradaySuccess(symbol, intraData, curTime));
      } catch (error) {
        dispatch(new GetIntradayFailure(symbol, error));
      }
    }
  }
};

// API-request for getting intraday-data. Called only when user refreshes
// the screen manually (for example swiping down).
const refreshIntraday = (stock: Stock, symbol: string, curTime: Date) => async (
  dispatch: Dispatch<StockAction>
) => {
  if (stock) {
    if (
      stock.stockInfo === undefined ||
      stock.stockInfo.intraday === undefined ||
      refreshrateDated(curTime, stock.stockInfo.intraday.fetchTime)
    ) {
      dispatch(new RefreshIntradayBegin(symbol));
      try {
        const intraData = await stockIntraApiRequest(symbol);
        dispatch(new RefreshIntradaySuccess(symbol, intraData, curTime));
      } catch (error) {
        dispatch(new RefreshIntradayFailure(symbol, error));
      }
    }
  }
};

// API-request for getting historydata
const getHistory = (stock: Stock, symbol: string, curTime: Date) => async (
  dispatch: Dispatch<StockAction>
) => {
  if (stock) {
    // Historydata is being refreshed once a day, if not undefined.
    if (
      stock.stockInfo === undefined ||
      stock.stockInfo.historyData === undefined ||
      onceADayRefreshrateDated(curTime, stock.stockInfo.historyData.fetchTime)
    ) {
      dispatch(new GetHistoryBegin(symbol));
      try {
        const historyData = await stockHistoryApiRequest(symbol);
        dispatch(new GetHistorySuccess(symbol, historyData, curTime));
      } catch (error) {
        dispatch(new GetHistoryFailure(symbol, error));
      }
    }
  }
};

// Helper functions:
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
