import React from 'react';
import { Text, View, FlatList } from 'react-native';
import {  ListItem, SearchBar} from 'react-native-elements';
import { connect } from 'react-redux';
import { RootState } from '../redux/reducers';
import {getStocks }from './actions'
import { Dispatch, bindActionCreators } from 'redux';
import {StockStyles} from './styles'


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
    //Dispatch the actions
    this.props.getAllStocks();
  }

   renderHeader = ():any => {
    return (
      <SearchBar
        inputStyle={{backgroundColor: 'white'}}
        lightTheme round
        noIcon
        placeholder="Search for stocks"
        //Todo: search bar functionality
        autoCorrect={false}
      />
    );
  };

  //This chekc what color revenue should be
  revenueColor = (revenue:string): (typeof StockStyles.revenueValueGreen) => {
    if (revenue.charAt(0) == "+"){
      return StockStyles.revenueValueGreen;
    }
    else{
      return StockStyles.revenueValueRed;
    }
  }

  //Every other listitem has gray background
  listBackgroundColor = (index:number): string =>{
    if(index % 2){
      return "white"
    }
    else{
      return  "#F0F0F0"
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
      
          <ListItem containerStyle = {{height: 80, backgroundColor: this.listBackgroundColor(index), borderBottomWidth:0}}

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
  stocks: state.stocksListing.stocks,
  loading:state.stocksListing.loading,
  error:state.stocksListing.error
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

