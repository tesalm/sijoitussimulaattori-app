import React, { Props } from 'react';
import { Text, View, FlatList, StyleSheet, NativeSyntheticEvent } from 'react-native';
import { List, ListItem, SearchBar, Icon} from 'react-native-elements';
import { connect } from 'react-redux';
import { RootState } from '../redux/reducers';
import {getStocks }from './actions'
import { Dispatch, bindActionCreators } from 'redux';
import {StockStyles} from './styles'
import { TabRouter } from 'react-navigation';

interface StockProps{
  stocks: Array<{key: string, revenue: string, lastsale: string}>;
  loading:boolean;
  error:Error | null;
  getAllStocks: typeof getStocks;
}
interface StockState{
  stocks:Array<{key: string,  revenue: string, lastsale: string}>;
  loading:boolean;
  error:Error|null;
}
class StockListing extends React.Component<StockProps,StockState> {
  constructor(props:StockProps){
    super(props);

    this.state = {
      stocks:[],
      loading: false,
      error: null
    }
    
  }

  componentDidMount(){
    this.props.getAllStocks();
  }

   renderHeader = ():any => {
    return (
      <SearchBar
        placeholder="Search for stocks"
        lightTheme
        //Todo: search bar functionality
        autoCorrect={false}
      />
    );
  };

  revenueColor = (revenue:string): (typeof StockStyles.revenueValueGreen) => {
    if (revenue.charAt(0) == "+"){
      return StockStyles.revenueValueGreen;
    }
    else{
      return StockStyles.revenueValueRed;
    }
  }

  listBackgroundColor = (index:number): string =>{
    if(index % 2){
      return "#F0F0F0"
    }
    else{
      return  "#FFFFF"
    }
  }

  render() {
    const {stocks,loading,error}= this.props;
    if(error){
      return <Text>Error! {error.message} </Text>
    }
    if(loading){
      return<Text>Loading...</Text>
    }

    return (
      <FlatList
        data= {stocks}
        renderItem={({ item,index }) => (
      
          <ListItem containerStyle = {{height: 80, backgroundColor: this.listBackgroundColor(index)}}
            title={item.key}
            titleStyle ={StockStyles.titleStyle}
            rightTitle ={item.revenue}
            rightTitleStyle = {this.revenueColor(item.revenue)}
        
            hideChevron
            subtitle={
              <View style = {StockStyles.subtitleView}>
                <Text style = {StockStyles.lastSaleText}>Last sale</Text>
                <Text style = {StockStyles.lastSaleValue}> {item.lastsale} </Text>
              </View>
            }
          />
        )} 
        
        ListHeaderComponent =  {this.renderHeader}   
      />
    );
  }
}
const mapStateToProps = (state: RootState) => ({
  stocks: state.stocks.stocks,
  loading:state.stocks.loading,
  error:state.stocks.error
});

const mapDispatchToProps = (dispatch: Dispatch) => 
  bindActionCreators(
    {
      getAllStocks: getStocks,

    },
    dispatch
);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StockListing);

