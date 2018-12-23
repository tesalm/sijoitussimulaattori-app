import React from 'react';
import { Button, Text, TextInput, View } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import validator from 'validator';

import { t } from '../assets/i18n';
import { RouteName } from '../navigation/routes';
import { RootState } from '../redux/reducers';
import { CreateNewPortfolio } from './actions';
import { CreatePortfolioStyles as styles } from './styles';

export interface CreatePortfolioProps {
  onCreatePortfolio: typeof CreateNewPortfolio;
}

type CreatePortfolioPropsWithNavigation = CreatePortfolioProps &
  NavigationScreenProps;

interface CreatePortfolioState {
  inputNumber: string;
  amount: number;
  name: string;
  nameError: boolean;
  amountError: boolean;
  errorMessageTranslationKey: string;
}

class CreatePortfolio extends React.Component<
  CreatePortfolioPropsWithNavigation,
  CreatePortfolioState
> {
  constructor(props: CreatePortfolioPropsWithNavigation) {
    super(props);
    this.state = {
      inputNumber: '',
      amount: NaN,
      name: '',
      nameError: true,
      amountError: true,
      errorMessageTranslationKey: '',
    };
  }

  sanitize(input: string) {
    const trimWhitespaces = validator.trim(input);
    if (trimWhitespaces === '') {
      this.setState({
        errorMessageTranslationKey: 'InputErrors.NameEmpty',
      });
    } else {
      this.setState({ name: input, nameError: false });
    }
  }

  validateAmount(input: string) {
    const trimWhitespaces = validator.trim(input);
    const commaToPoint: string = trimWhitespaces.replace(/,/g, '.');
    if (commaToPoint === '') {
      this.setState({
        errorMessageTranslationKey: 'InputErrors.NotNumber',
      });
    } else if (validator.isNumeric(commaToPoint)) {
      this.setState({
        amount: validator.toFloat(commaToPoint),
        amountError: false,
      });
    } else {
      this.setState({
        errorMessageTranslationKey: 'InputErrors.NotNumber',
      });
    }
  }

  validate() {
    const { onCreatePortfolio } = this.props;
    this.sanitize(this.state.name);
    this.validateAmount(this.state.inputNumber);
    if (!this.state.nameError && !this.state.amountError) {
      onCreatePortfolio(this.state.name, this.state.amount);
      this.props.navigation.navigate(RouteName.Home);
    }
  }

  showErrors() {
    return this.state.nameError || this.state.amountError ? (
      <Text style={styles.error}>
        {t(this.state.errorMessageTranslationKey)}
      </Text>
    ) : null;
  }

  static navigationOptions = { title: t('CreatePortfolio.Title') };
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.main}>
          {t('CreatePortfolio.PortfolioNameInputTitle')}
        </Text>
        <TextInput
          style={styles.textinput}
          ref="name"
          onChangeText={(name) => this.setState({ name })}
          value={this.state.name}
        />
        <Text style={styles.main}>
          {t('CreatePortfolio.PortfolioAmountInputTitle')}
        </Text>
        <TextInput
          style={styles.textinput}
          keyboardType="numeric"
          ref="amount"
          onChangeText={(inputNumber) => this.setState({ inputNumber })}
          value={this.state.inputNumber}
        />
        <Button
          color="#004d40"
          title={t('CreatePortfolio.ConfirmButtonText')}
          onPress={() => this.validate()}
        />
        <View>{this.showErrors()}</View>
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
      onCreatePortfolio: CreateNewPortfolio,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreatePortfolio);

export { CreatePortfolio as CreatePortfolioTest };
