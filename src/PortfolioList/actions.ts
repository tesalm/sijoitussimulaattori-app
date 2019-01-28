import { Dispatch } from 'redux';

import {
  portfolioApiRequest,
  portfolioListApiRequest,
  transactionApiRequest,
} from '../util/api';
import { Portfolio, SinglePortfolio, Transaction } from './reducer';

export enum ActionType {
  RequestPortfolioListingBegin = '[Portfolios] API Request',
  RequestPortfoliosListingSuccess = '[Portfolios] API Success',
  RequestPortfoliosListingFailure = '[Portfolios] API Failure',
  RequestPortfolioBegin = '[Portfolio] Data Request',
  RequestPortfolioSuccess = '[Portfolio] Data Success',
  RequestPortfolioFailure = '[Portfolio] Data Failure',
  SaveCurrentPortfolioId = '[Portfolios] Save Current Portfolio Id',
  SaveTransactionBegin = '[Bid] Save transaction begin',
  SaveTransactionSuccess = '[Bid] Save transaction success',
  SaveTransactionFailure = '[Bid] Save transaction failure',
}

export type PortfolioAction =
  | RequestPortfolioListingBegin
  | RequestPortfoliosListingSuccess
  | RequestPortfoliosListingFailure
  | SaveCurrentPortfolioId
  | RequestPortfolioBegin
  | RequestPortfolioSuccess
  | RequestPortfolioFailure
  | SaveTransactionBegin
  | SaveTransactionSuccess
  | SaveTransactionFailure;

export class RequestPortfolioListingBegin {
  readonly type = ActionType.RequestPortfolioListingBegin;
  constructor() {
    return { type: this.type };
  }
}

export class RequestPortfoliosListingSuccess {
  readonly type = ActionType.RequestPortfoliosListingSuccess;
  constructor(public portfolios: Array<SinglePortfolio>) {
    return { type: this.type, portfolios };
  }
}

export class RequestPortfoliosListingFailure {
  readonly type = ActionType.RequestPortfoliosListingFailure;
  constructor(public error: Error) {
    return { type: this.type, error };
  }
}

export class SaveCurrentPortfolioId {
  readonly type = ActionType.SaveCurrentPortfolioId;
  constructor(public id: string) {
    return { type: this.type, id };
  }
}

export class RequestPortfolioBegin {
  readonly type = ActionType.RequestPortfolioBegin;
  constructor(public portfolioId: string) {
    return { type: this.type, portfolioId };
  }
}

export class RequestPortfolioSuccess {
  readonly type = ActionType.RequestPortfolioSuccess;
  constructor(public portfolio: Portfolio, public portfolioId: string) {
    return { type: this.type, portfolio, portfolioId };
  }
}

export class RequestPortfolioFailure {
  readonly type = ActionType.RequestPortfolioFailure;
  constructor(public error: Error, public portfolioId: string) {
    return { type: this.type, error, portfolioId };
  }
}

export class SaveTransactionBegin {
  readonly type = ActionType.SaveTransactionBegin;
  constructor(public portfolioId: string) {
    return { type: this.type, portfolioId };
  }
}

export class SaveTransactionSuccess {
  readonly type = ActionType.SaveTransactionSuccess;
  constructor(public portfolioId: string, public transaction: Transaction) {
    return { type: this.type, portfolioId, transaction };
  }
}

export class SaveTransactionFailure {
  readonly type = ActionType.SaveTransactionFailure;
  constructor(public portfolioId: string, public error: Error) {
    return { type: this.type, portfolioId, error };
  }
}

const getPortfolioData = (portfolioId: string) => async (
  dispatch: Dispatch<PortfolioAction>
) => {
  dispatch(new RequestPortfolioBegin(portfolioId));
  try {
    const data = await portfolioApiRequest(portfolioId);
    dispatch(new RequestPortfolioSuccess(data, portfolioId));
  } catch (error) {
    dispatch(new RequestPortfolioFailure(error, portfolioId));
  }
};

const saveAsCurrentPortfolioId = (symbol: string) => async (
  dispatch: Dispatch<PortfolioAction>
) => {
  dispatch(new SaveCurrentPortfolioId(symbol));
};

const getPortfolios = () => async (dispatch: Dispatch<PortfolioAction>) => {
  dispatch(new RequestPortfolioListingBegin());
  try {
    const data = await portfolioListApiRequest();
    data.forEach((portfolio) => {
      portfolio.portfolioInfo = {
        loading: false,
        error: undefined,
        refreshing: false,
        portfolio: undefined,
      };
    });
    dispatch(new RequestPortfoliosListingSuccess(data));
  } catch (error) {
    dispatch(new RequestPortfoliosListingFailure(error));
  }
};

const saveTransaction = (
  action: string,
  stockSymbol: string,
  amountOfStocks: number,
  bidLevel: number,
  portfolioId: string
) => async (dispatch: Dispatch<PortfolioAction>) => {
  dispatch(new SaveTransactionBegin(portfolioId));
  try {
    const data = await transactionApiRequest(
      action,
      stockSymbol,
      amountOfStocks,
      bidLevel,
      portfolioId
    );
    dispatch(new SaveTransactionSuccess(portfolioId, data));
  } catch (error) {
    dispatch(new SaveTransactionFailure(portfolioId, error));
  }
};

export {
  getPortfolios,
  saveAsCurrentPortfolioId,
  getPortfolioData,
  saveTransaction,
};
