import React, { Props } from 'react';
import { Text, View, FlatList } from 'react-native';
import { List, ListItem} from 'react-native-elements';
import { NavigationScreenProps } from 'react-navigation';
import { Styles } from '../navigation/styles';
import { connect } from 'react-redux';
import { RootState } from '../redux/reducers';
import {getStocks,begin }from './actions'
import { Dispatch, bindActionCreators } from 'redux';

interface StockProps{
  stocks: Array<{key: string, value: string}>;
  loading:boolean;
  error:Error | null;
  getAllStocks: typeof getStocks;
  beginStocks: typeof begin;

}
interface StockState{
  stocks:Array<{key: string, value: string}>;
  loading:boolean;
  error:Error|null;


}

export class StockListing extends React.Component<StockProps,StockState> {
  constructor(props:StockProps){
    super(props);

    this.state = {
      stocks:[{key: "Nokai",value: "jotain"}],
      loading: true,
      error: null
    }
    
  }
  componentDidMount(){

    this.props.beginStocks;
  }
  render() {
    const {stocks,loading,error}= this.props;
    if(error){
      return <div>Error! {error.message} </div>
    }
    if(loading){
      return<Text>Loading...</Text>
    }
        return (
        <FlatList
          data= {stocks}
          renderItem={({ item }) => (
            
            <ListItem
              title={item.key}
              rightTitle = {item.value}
              rightTitleStyle = {{color: 'green'}}
              subtitle={item.value}

            />
            
          )}
          
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
      beginStocks: begin,
    },
    dispatch
  );
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StockListing as any);
