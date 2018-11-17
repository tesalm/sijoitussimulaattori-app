import { Dispatch } from 'redux';
import axios from 'axios';

export enum ActionType {
    GetStocksBegin = 'GET_STOCKS_BEGIN',
    GetStocksSuccess = 'GET_STOCKS_SUCCESS',
    GetStocksFailure = 'GET_STOCKS_FAILURE',
  }

export type StocksAction = GetStocksBegin | GetStocksSuccess | GetStocksFailure;

export class GetStocksBegin {
    readonly type = ActionType.GetStocksBegin;
    constructor(){
        return {type: this.type}
    }
}

export class GetStocksSuccess {
    readonly type = ActionType.GetStocksSuccess;
    constructor(public stocks :Array<{key: string, revenue: number, lastsale: number}> ){
        return {type: this.type, stocks}
    }
}

export class GetStocksFailure {
    readonly type = ActionType.GetStocksFailure;
    constructor(public error: Error){
        return {type: this.type, error}
    }
}
//This is called by StockListing. Dispatch needed actions and fetch the data
const getStocks = ()  => async(dispatch:Dispatch<StocksAction>) => {
    dispatch(new GetStocksBegin());
    fetch("http://192.168.1.9:3000/stocks/list").then(res => res.json())
    .then(json => {dispatch(new GetStocksSuccess(json.results))})
    .catch(error => {dispatch(new GetStocksFailure(error))})

}

export{getStocks}