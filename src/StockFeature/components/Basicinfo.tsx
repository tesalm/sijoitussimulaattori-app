import React from 'react';

import { Text, View } from 'react-native';
import { connect } from 'react-redux';

import { t } from '../../assets/i18n';
import { stockStyles } from '../styles';
import { NavigationScreenProps } from 'react-navigation';
import { getStock } from '../actions';
import { RootState } from '../../redux/reducers';
import { bindActionCreators, Dispatch } from 'redux';

interface StockProps extends NavigationScreenProps {
  stock: Array<{
    key: string,
    bid: number,
    offer: number,
    high: number,
    low: number,
    marketValue: number,
    revenue: number
  }>;
  loading: boolean;
  error: Error | null;
  getSingleStock: typeof getStock;
}

class Basicinfo extends React.Component<StockProps> {
  constructor(props:StockProps) {
    super(props);

    this.state = {
      stock: [],
      loading: false,
      error: null,
    }
  }

  componentDidMount() {
    this.props.getSingleStock();
  }

  render() {
    const {
      stock,
      loading,
      error
    } = this.props;

    if (error) {
      return <Text>Error! {error.message} </Text>
    }

    if (loading) {
      return <Text>Loading!</Text>
    }

    return (
      <View style={{ flex: 3, justifyContent: 'space-between' }}>
        <View style={{ flex: 2, flexDirection: 'row'  }}>
          <View style={{ width: '25%', flexDirection: 'column' }}>
            <Text style={ stockStyles.infoHeader }>{t('Bid')}</Text>
            {stock.map((item, key) =>(
              <Text key={key}>{ item }</Text>)
            )}
            <Text style={ stockStyles.infoHeader }>{t('Offer')}</Text>
            <Text style={ stockStyles.infoText }>500€</Text>
          </View>
          <View style={{ width: '25%', flexDirection: 'column' }}>
            <Text style={ stockStyles.infoHeader }>{t('High')}</Text>
            <Text style={ stockStyles.infoText }>10€</Text>
            <Text style={ stockStyles.infoHeader }>{t('Low')}</Text>
            <Text style={ stockStyles.infoText }>500€</Text>
          </View>
          <View style={{ width: '50%', flexDirection: 'column'}}>
            <Text>{t('Market value')}</Text>
            <Text>8</Text>
            <Text>{t('Revenue in 24h')}</Text>
            <Text>7</Text>
          </View>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={ stockStyles.infoHeader }>{t('Updated')} 09.11.2018 16:36.48</Text>
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  stock: state.singleStock.stock,
  loading: state.singleStock.loading,
  error: state.singleStock.error
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      getSingleStock: getStock,
    },
    dispatch
  );

  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Basicinfo);
