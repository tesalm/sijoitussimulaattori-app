import React from 'react';
import { Platform, Text, View, Button } from 'react-native';
import CounterView from './components/CounterView';
import { helloStyles as styles } from './styles';
import { RootState } from '../redux/reducers';
import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { CounterAction, addToCounter, removeFromCounter } from './actions';

const instructions = Platform.select({
  ios: 'You are on iOS',
  android: 'You are on Android',
});

export interface HelloProps {
  name?: string;
  counterValue: number;
  onIncrement: typeof addToCounter;
  onDecrement: typeof removeFromCounter;
}

export class Hello extends React.Component<HelloProps> {
  constructor(props: HelloProps) {
    super(props);
  }

  render() {
    const { name, counterValue, onIncrement, onDecrement } = this.props;
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Hello, {name || 'World'}!</Text>
        <Text style={styles.instructions}>{instructions}</Text>
        <CounterView counterValue={counterValue} />
        <Button
          onPress={() => onIncrement && onIncrement(1)}
          title="Increment counter"
        />
        <Button onPress={onDecrement} title="Decrement counter" />
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
