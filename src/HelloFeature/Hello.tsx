import React from 'react';
import { Button, Platform, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import { t } from '../assets/i18n';
import { RootState } from '../redux/reducers';
import { addToCounter, removeFromCounter } from './actions';
import CounterView from './components/CounterView';
import { helloStyles as styles } from './styles';

const instructions = Platform.select<string>({
  ios: 'You are on iOS',
  android: 'You are on Android',
});

export interface HelloProps {
  name?: string;
  counterValue: number;
  onIncrement: typeof addToCounter;
  onDecrement: typeof removeFromCounter;
}

interface HelloState {
  amount: number;
}

class Hello extends React.Component<HelloProps, HelloState> {
  constructor(props: HelloProps) {
    super(props);
    this.state = { amount: 1 };
  }

  render() {
    const { name, counterValue, onIncrement, onDecrement } = this.props;

    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          {t('Hello.HelloGreetee', { greetee: name || t('Hello.World') })}
        </Text>
        <Text style={styles.instructions}>{instructions}</Text>
        <CounterView counterValue={counterValue} />
        <Button
          onPress={() => onIncrement && onIncrement(this.state.amount)}
          title="Increment counter"
        />
        <Button onPress={onDecrement} title="Decrement counter" />
        <Button
          onPress={() => this.setState({ amount: this.state.amount + 1 })}
          title="Add 1 to incrementation step"
        />
        <Text style={styles.instructions}>
          Incrementation step: {this.state.amount || 1}
        </Text>
      </View>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  counterValue: state.counter.counterValue,
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      onIncrement: addToCounter,
      onDecrement: removeFromCounter,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Hello);

export { Hello as HelloTest };
