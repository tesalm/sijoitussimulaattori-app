import React from 'react';
import { Text, View, FlatList, ActivityIndicator } from 'react-native';
import {  ListItem, SearchBar} from 'react-native-elements';
import { connect } from 'react-redux';
import { RootState } from '../redux/reducers';
import {getStocks }from './actions'
import { Dispatch, bindActionCreators } from 'redux';
import {StockStyles} from './styles'
import { NavigationScreenProps } from 'react-navigation';


interface StockProps extends NavigationScreenProps{
  stocks: Array<{key: string, revenue: number, lastsale: number}>;
  loading:boolean;
  error:Error | null;
  getAllStocks: typeof getStocks;
}
interface StockState{
  stocks:Array<{key: string,  revenue: number, lastsale: number}>;
  loading:boolean;
  error:Error|null;
}

 class MarketScreen extends React.Component<
   StockProps, StockState> {
  static navigationOptions = { title: 'Stocks' };
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
        //inputStyle={{backgroundColor: 'white'}}
        lightTheme round
        placeholder="Search for stocks"
        //Todo: search bar functionality
        autoCorrect={false}
      />
    );
  };

  //This checks what color revenue should be
  revenueColor = (revenue:number): (typeof StockStyles.revenueValueGreen) => {
    if (revenue >= 0){
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

  //format revenue to right forms. Converts number to string and add procent marker.
  formatRevenue = (revenue:number): string =>{
    if(revenue >= 0){
      return ("+" + (revenue*100).toFixed(2) + " %")
    }
    else if(revenue < 0){
      return((revenue*100).toFixed(2) + " %")
    }
    else {
      return "ERROR"
    }
  }

  render() {
    const {stocks,loading,error}= this.props;
    if(error){
      return <Text>Error! {error.message} </Text>
    }
    if(loading){
      return <View style = {StockStyles.loadingView}><ActivityIndicator size="large"/></View>
    }

    return (
      <FlatList 
        data= {stocks}
        renderItem={({ item,index }) => (
          //To do: navigate to to right stock page.
          <ListItem onPress = {() => this.props.navigation.navigate('Commissions')} 
            containerStyle = {{height: 80, backgroundColor:
            this.listBackgroundColor(index), borderBottomWidth:0}}

            title={item.key}
            titleStyle ={StockStyles.titleStyle}
            rightTitle ={ 
              <View style = {StockStyles.rightTitleView}>
                <Text style = {StockStyles.revenueText}>Revenue in 24h</Text>
                <Text style = {this.revenueColor(item.revenue)}>{this.formatRevenue(item.revenue)}</Text>
              </View>}
            subtitle={
              <View style = {StockStyles.subtitleView}>
                <Text style = {StockStyles.lastSaleText}>Last sale</Text>
                <Text style = {StockStyles.lastSaleValue}> {item.lastsale + " $"} </Text>
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
)(MarketScreen);




