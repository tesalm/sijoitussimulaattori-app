import { Dispatch } from 'redux';

export enum ActionType {
    GetStocksBegin = 'GET_STOCKS_BEGIN',
    GetStocksSuccess = 'GET_STOCKS_SUCCESS',
    GetStocksFailure = 'GET_STOCKS_FAILURE',
  }

export type StocksAction = GetStocksBegin | GetStocksSuccess | GetStocksFailure;

interface GetStocksBegin {
    type: ActionType.GetStocksBegin;
}
  
interface GetStocksSuccess {
    type: ActionType.GetStocksSuccess;
    stocks: Array<{key: string, value: string}>;
}
  
interface GetStocksFailure {
    type: ActionType.GetStocksFailure;
    error: Error,
}

const getStocksBeginAction = (): GetStocksBegin => ({
    type: ActionType.GetStocksBegin,
  });
  
const getStocksSuccessAction = (stocks: Array<{key: string, value: string}> ): GetStocksSuccess => ({
    type: ActionType.GetStocksSuccess,
    stocks: stocks,
  });

const getStocksFailureAction = (error: Error): GetStocksFailure => ({
    type: ActionType.GetStocksFailure,
    error : error,
  });

const begin = () => (dispatch: Dispatch<GetStocksBegin>) =>
    dispatch(getStocksBeginAction());


const success = (stocks: Array<{key: string, value: string}> ) => (dispatch: Dispatch<GetStocksSuccess>) =>
    dispatch(getStocksSuccessAction(stocks));

const errorr = (error: Error) => (dispatch: Dispatch<GetStocksFailure>) =>
    dispatch(getStocksFailureAction(error));

function getStocks():void{
    begin();
    fetch("http://localhost:3000/stocks/list").then(res => res.json()).then(json => {success(json)})
    .catch(error => errorr(error))

}

export{getStocks,begin}