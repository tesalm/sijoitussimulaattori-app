import { Dispatch } from 'redux';

import {
  StockListApiRequest,
  stockMetaApiRequest,
  stockIntraApiRequest,
  stockHistoryApiRequest,
} from '../utils/api';
import { Stock } from './reducers';

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
  RefreshIntradayBegin = '[Stocks] Intraday begin refresh',
  GetIntradaySuccess = '[Stocks] Intraday success',
  GetIntradayFailure = '[Stocks] Intraday failure',
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
  | RefreshIntradayBegin
  | GetIntradaySuccess
  | GetIntradayFailure
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
  constructor(public stocks: Array<Stock>) {
    return { type: this.type, stocks };
  }
}

export class GetStockMetadataSuccess {
  readonly type = ActionType.GetStockMetadataSuccess;
  constructor(public stocks: Array<Stock>) {
    return { type: this.type, stocks };
  }
}

export class GetStockMetadataFailure {
  readonly type = ActionType.GetStockMetadataFailure;
  constructor(public stocks: Array<Stock>) {
    return { type: this.type, stocks };
  }
}

export class GetIntradayBegin {
  readonly type = ActionType.GetIntradayBegin;
  constructor(public stocks: Array<Stock>) {
    return { type: this.type, stocks };
  }
}

export class RefreshIntradayBegin {
  readonly type = ActionType.RefreshIntradayBegin;
  constructor(public stocks: Array<Stock>) {
    return { type: this.type, stocks };
  }
}

export class GetIntradaySuccess {
  readonly type = ActionType.GetIntradaySuccess;
  constructor(public stocks: Array<Stock>) {
    return { type: this.type, stocks };
  }
}

export class GetIntradayFailure {
  readonly type = ActionType.GetIntradayFailure;
  constructor(public stocks: Array<Stock>) {
    return { type: this.type, stocks };
  }
}

export class GetHistoryBegin {
  readonly type = ActionType.GetHistoryBegin;
  constructor(public stocks: Array<Stock>) {
    return { type: this.type, stocks };
  }
}

export class GetHistorySuccess {
  readonly type = ActionType.GetHistorySuccess;
  constructor(public stocks: Array<Stock>) {
    return { type: this.type, stocks };
  }
}
export class GetHistoryFailure {
  readonly type = ActionType.GetHistoryFailure;
  constructor(public stocks: Array<Stock>) {
    return { type: this.type, stocks };
  }
}

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

const saveStockSymbol = (symbol: string) => async (
  dispatch: Dispatch<StockAction>
) => {
  dispatch(new SaveSymbol(symbol));
};

// Single stock -actions:
const getStockMetadata = (
  stockList: Array<Stock>,
  symbol: string,
  curTime: Date
) => async (dispatch: Dispatch<StockAction>) => {
  var stocks = stockList.slice(0);
  var stock = stocks.find((stock) => {
    return stock.symbol === symbol;
  });
  if (stock) {
    stock.stockInfo.metaLoading = true;
    dispatch(new GetStockMetadataBegin(stocks));
    try {
      const meta = await stockMetaApiRequest(symbol);
      meta.fetchTime = curTime;
      stock.stockInfo.metaLoading = false;
      stock.stockInfo.metaError = undefined;
      stock.stockInfo.stockMetadata = meta;
      dispatch(new GetStockMetadataSuccess(stocks));
    } catch (error) {
      stock.stockInfo.stockMetadata = undefined;
      stock.stockInfo.metaLoading = false;
      stock.stockInfo.metaError = error;
      dispatch(new GetStockMetadataFailure(stocks));
    }
  }
};

const getIntraday = (
  stockList: Array<Stock>,
  symbol: string,
  curTime: Date
) => async (dispatch: Dispatch<StockAction>) => {
  var stocks = stockList.slice(0);
  var stock = stocks.find((stock) => {
    return stock.symbol === symbol;
  });
  if (stock) {
    stock.stockInfo.intraLoading = true;
    dispatch(new GetIntradayBegin(stocks));
    try {
      const intraData = await stockIntraApiRequest(symbol);
      intraData.fetchTime = curTime;
      stock.stockInfo.intraday = intraData;
      stock.stockInfo.intraLoading = false;
      stock.stockInfo.intraError = undefined;
      dispatch(new GetIntradaySuccess(stocks));
    } catch (error) {
      stock.stockInfo.intraday = undefined;
      stock.stockInfo.intraLoading = false;
      stock.stockInfo.intraError = error;
      dispatch(new GetIntradayFailure(stocks));
    }
  }
};

const refreshIntraday = (
  stockList: Array<Stock>,
  symbol: string,
  curTime: Date
) => async (dispatch: Dispatch<StockAction>) => {
  var stocks = stockList.slice(0);
  var stock = stocks.find((stock) => {
    return stock.symbol === symbol;
  });
  if (stock) {
    stock.stockInfo.refreshing = true;
    dispatch(new RefreshIntradayBegin(stocks));
    try {
      const intraData = await stockIntraApiRequest(symbol);
      intraData.fetchTime = curTime;
      stock.stockInfo.intraday = intraData;
      stock.stockInfo.refreshing = false;
      stock.stockInfo.intraError = undefined;
      dispatch(new GetIntradaySuccess(stocks));
    } catch (error) {
      stock.stockInfo.intraday = undefined;
      stock.stockInfo.refreshing = false;
      stock.stockInfo.intraError = error;
      dispatch(new GetIntradayFailure(error));
    }
  }
};

const getHistory = (
  stockList: Array<Stock>,
  symbol: string,
  curTime: Date
) => async (dispatch: Dispatch<StockAction>) => {
  var stocks = stockList.slice(0);
  var stock = stocks.find((stock) => {
    return stock.symbol === symbol;
  });
  if (stock) {
    stock.stockInfo.historyLoading = true;
    dispatch(new GetHistoryBegin(stocks));
    try {
      const historyData = await stockHistoryApiRequest(symbol);
      historyData.fetchTime = curTime;
      stock.stockInfo.historyData = historyData;
      stock.stockInfo.historyLoading = false;
      stock.stockInfo.historyError = undefined;
      dispatch(new GetHistorySuccess(stocks));
    } catch (error) {
      stock.stockInfo.historyData = undefined;
      stock.stockInfo.historyLoading = false;
      stock.stockInfo.historyError = error;
      dispatch(new GetHistoryFailure(stocks));
    }
  }
};

export {
  getStocks,
  refreshStocks,
  saveStockSymbol,
  getStockMetadata,
  getIntraday,
  refreshIntraday,
  getHistory,
};
