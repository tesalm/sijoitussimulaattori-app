import cloneDeep from 'lodash/cloneDeep';
import { ActionType, PortfolioAction } from './actions';

export interface CreatePortfolio {
  uid: string;
  name: string;
  balance: number;
  ownerId: string;
}

export interface PortfolioStock {
  uid: string;
  amount: number;
  avgPrice: number;
  totalRevenue: number;
  totalMarketValue: number;
  lastDayRevenue: number;
}
export interface SinglePortfolio {
  uid: string;
  name: string;
  balance: number;
  ownerId: string;
  totalRevenue: number;
  totalMarketValue: number;
  lastDayRevenue: number;
  portfolioInfo: PortfolioInfo;
}

export interface PortfolioInfo {
  loading: boolean;
  refreshing: boolean;
  error?: Error;
  portfolio?: Portfolio;
}

export interface Portfolio {
  uid: string;
  name: string;
  balance: number;
  totalRevenue: number;
  totalMarketValue: number;
  lastDayRevenue: number;
  ownerId: string;
  stocks: PortfolioStock[];
}

export interface CreatingPortfolio {
  creatingPortfolioLoading: boolean;
  creatingPortfolioError?: Error;
  creatingPortfolioSuccess: boolean;
}

export interface PortfolioListing {
  portfolioListing: Array<SinglePortfolio>;
  loading: boolean;
  error?: Error;
  portfolioId?: string;
  creatingPortfolio: CreatingPortfolio;
}

const initialState: PortfolioListing = {
  portfolioListing: [],
  loading: false,
  error: undefined,
  creatingPortfolio: {
    creatingPortfolioLoading: false,
    creatingPortfolioError: undefined,
    creatingPortfolioSuccess: false,
  },
};

export const portfolioListingReducer = (
  state: PortfolioListing = initialState,
  action: PortfolioAction
): PortfolioListing => {
  switch (action.type) {
    case ActionType.RequestPortfolioListingBegin:
      return { ...cloneDeep(state), loading: true, error: undefined };
    case ActionType.RequestPortfoliosListingSuccess:
      return {
        ...cloneDeep(state),
        portfolioListing: action.portfolios,
        loading: false,
        error: undefined,
      };
    case ActionType.RequestPortfoliosListingFailure:
      return { ...cloneDeep(state), loading: false, error: action.error };
    case ActionType.SaveCurrentPortfolioId:
      return { ...cloneDeep(state), portfolioId: action.id };
    case ActionType.RequestPortfolioBegin: {
      const portfolioList = cloneDeep(state.portfolioListing);
      const portfolioIndex = getPortfolioIndex(
        portfolioList,
        action.portfolioId
      );
      if (portfolioIndex < 0) {
        return { ...cloneDeep(state) };
      }
      portfolioList[portfolioIndex].portfolioInfo.loading = true;
      return { ...cloneDeep(state), portfolioListing: portfolioList };
    }
    case ActionType.RequestPortfolioSuccess: {
      const portfolioList = cloneDeep(state.portfolioListing);
      const portfolioIndex = getPortfolioIndex(
        portfolioList,
        action.portfolioId
      );
      if (portfolioIndex < 0) {
        return { ...cloneDeep(state) };
      }
      portfolioList[portfolioIndex].portfolioInfo = {
        ...portfolioList[portfolioIndex].portfolioInfo,
        portfolio: action.portfolio,
        loading: false,
        error: undefined,
      };
      return { ...cloneDeep(state), portfolioListing: portfolioList };
    }
    case ActionType.RequestPortfolioFailure: {
      const portfolioList = cloneDeep(state.portfolioListing);
      const portfolioIndex = getPortfolioIndex(
        portfolioList,
        action.portfolioId
      );
      if (portfolioIndex < 0) {
        return { ...cloneDeep(state) };
      }
      portfolioList[portfolioIndex].portfolioInfo = {
        ...portfolioList[portfolioIndex].portfolioInfo,
        portfolio: undefined,
        loading: false,
        error: action.error,
      };
      return { ...cloneDeep(state), portfolioListing: portfolioList };
    }
    case ActionType.CreatePortfolioBegin: {
      const creation = cloneDeep(state.creatingPortfolio);
      creation.creatingPortfolioLoading = true;
      creation.creatingPortfolioError = undefined;
      creation.creatingPortfolioSuccess = false;
      return { ...state, creatingPortfolio: creation };
    }
    case ActionType.CreatePortfolioSuccess: {
      const creation = cloneDeep(state.creatingPortfolio);
      creation.creatingPortfolioLoading = false;
      creation.creatingPortfolioError = undefined;
      creation.creatingPortfolioSuccess = true;
      const newPortfolio = {
        uid: action.uid,
        name: action.name,
        ownerId: action.ownerId,
        balance: action.amount,
        totalRevenue: 0,
        totalMarketValue: 0,
        lastDayRevenue: 0,
        portfolioInfo: {
          loading: false,
          refreshing: false,
          error: undefined,
          portfolio: undefined,
        },
      };
      const portfolioList = cloneDeep(state.portfolioListing);
      portfolioList.push(newPortfolio);
      return {
        ...cloneDeep(state),
        creatingPortfolio: creation,
        portfolioListing: portfolioList,
      };
    }
    case ActionType.CreatePortfolioFailure: {
      const creation = cloneDeep(state.creatingPortfolio);
      creation.creatingPortfolioLoading = false;
      creation.creatingPortfolioError = action.error;
      creation.creatingPortfolioSuccess = false;
      return { ...state, creatingPortfolio: creation };
    }
    default:
      return state;
  }
};

const getPortfolioIndex = (
  portfolioList: SinglePortfolio[],
  portfolioId: string
) =>
  portfolioList.findIndex((portfolio) => {
    return portfolio.uid === portfolioId;
  });
