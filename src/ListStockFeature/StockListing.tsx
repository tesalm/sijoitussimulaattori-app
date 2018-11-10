import React, { Props } from 'react';
import { Text, View, FlatList, StyleSheet, NativeSyntheticEvent } from 'react-native';
import { List, ListItem, SearchBar} from 'react-native-elements';
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
    this.props.getAllStocks();
  }

   renderHeader = ():any => {
    return (
      <SearchBar
        placeholder="Type Here..."
        lightTheme
        onChangeText={text => console.log("Moi")}
        autoCorrect={false}
      />
    );
  };

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
       
        (index % 2)?
          <ListItem containerStyle = {{height: 80, backgroundColor: "#F0F0F0"}}
            title={item.key}
            titleStyle ={StockStyles.titleStyle}
            rightTitle ={item.revenue}
            rightTitleStyle = {StockStyles.revenueValue}
            subtitle={
              <View style = {StockStyles.subtitleView}>
                <Text style = {StockStyles.lastSaleText}>Last sale</Text>
                <Text style = {StockStyles.lastSaleValue}> {item.lastsale} </Text>
              </View>
            }
          /> 
        :
          <ListItem containerStyle = {{height: 80, backgroundColor: "#FFFFF"}}
            title={item.key}
            titleStyle ={StockStyles.titleStyle}
            rightTitle ={item.revenue}
            rightTitleStyle = {StockStyles.revenueValue}
            subtitle={
              <View style = {StockStyles.subtitleView}>
              <Text style = {StockStyles.lastSaleText}>Last sale</Text>
            < Text style = {StockStyles.lastSaleValue}> {item.lastsale} </Text>
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

