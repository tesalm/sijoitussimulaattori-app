import React from 'react';
import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  ActivityIndicator,
  ToastAndroid,
} from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import validator from 'validator';

import { t } from '../assets/i18n';
import { RootState } from '../redux/reducers';
import { CreatePortfolioStyles as styles } from './styles';
import { FormColors } from '../App/colors';
import { buttonStyles, textInputStyles } from '../App/styles';
import { createPortfolio } from '../PortfolioList/actions';

export interface CreatePortfolioProps {
  loading: boolean;
  error?: Error;
  create: typeof createPortfolio;
  success: boolean;
}

type CreatePortfolioPropsWithNavigation = CreatePortfolioProps &
  NavigationScreenProps;

interface CreatePortfolioState {
  amount: number;
  name: string;
  inputNumber: string;
  nameError: boolean;
  amountError: boolean;
  nameActive: boolean;
  amountErrorMessage: string;
  sumActive: boolean;
  createActive: boolean;
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
      nameError: false,
      amountError: false,
      nameActive: false,
      amountErrorMessage: '',
      sumActive: false,
      createActive: false,
    };
  }

  static navigationOptions = {
    header: null,
  };

  componentDidUpdate() {
    if (this.props.success) {
      this.props.navigation.goBack();
      ToastAndroid.show('Portfolio created successfully!', ToastAndroid.SHORT);
    }
  }

  // Sanitizes input. Trims whitespaces and checks if the name is empty.
  // TODO: Check if there is already a portfolio with the same name.
  sanitize(input: string) {
    const trimWhitespaces = validator.trim(input);
    if (trimWhitespaces === '') {
      this.setState({
        nameError: true,
        createActive: false,
      });
    } else {
      this.setState({ name: trimWhitespaces, nameError: false }, () => {
        if (!this.state.amountError) {
          this.setState({ createActive: true });
        }
      });
    }
  }

  // Trims whitespaces from the amount, replaces . -> ,
  // Checks that the amount is not empty, negative and that it's numeric.
  validateAmount(input: string) {
    const trimWhitespaces = validator.trim(input);
    const commaToPoint: string = trimWhitespaces.replace(/,/g, '.');
    console.log(commaToPoint);
    // If the string is empty, returns error message.
    if (commaToPoint === '') {
      this.setState({
        amountError: true,
        amountErrorMessage: 'InputErrors.NotNumber',
        createActive: false,
      });
      // If the first char is '-', returns error message.
    } else if (commaToPoint[0] === '-') {
      this.setState({
        amountError: true,
        amountErrorMessage: 'InputErrors.NotPositiveNumber',
        createActive: false,
      });
      // Checks that the commaToPoint is numeric.
      // Also checks, that if the last char is '.' that othet chars are numbers.
    } else if (
      validator.isNumeric(commaToPoint) ||
      (commaToPoint[commaToPoint.length - 1] === '.' &&
        validator.isNumeric(commaToPoint.substring(0, commaToPoint.length - 2)))
    ) {
      // Sets inputNumber to be the same as the amount that will be sent to the back end.
      this.setState(
        {
          amount: validator.toFloat(commaToPoint),
          amountError: false,
          inputNumber: validator.toFloat(commaToPoint).toString(),
        },
        () => {
          if (!this.state.nameError) {
            this.setState({
              createActive: true,
            });
          }
        }
      );
    } else {
      this.setState({
        amountError: true,
        amountErrorMessage: 'InputErrors.NotNumber',
        createActive: false,
      });
    }
  }

  async validate() {
    await this.sanitize(this.state.name);
    await this.validateAmount(this.state.inputNumber);
    if (!this.state.nameError && !this.state.amountError) {
      this.props.create(this.state.name, this.state.amount);
    }
  }

  showNameErrors() {
    return this.state.nameError ? (
      <Text style={styles.error}>{t('InputErrors.NameEmpty')}</Text>
    ) : null;
  }

  showAmountErrors() {
    return this.state.amountError ? (
      <Text style={styles.error}>{t(this.state.amountErrorMessage)}</Text>
    ) : null;
  }

  render() {
    const { loading, error } = this.props;
    const {
      nameActive,
      sumActive,
      name,
      inputNumber,
      createActive,
    } = this.state;

    if (error) {
      // TODO: Format error-message for user. Use showErrors-function.
      <Text>Error! From the API-request</Text>;
    }

    return (
      <View style={styles.container}>
        <View style={styles.nameContainer}>
          <Text style={styles.headings}>
            {t('CreatePortfolio.PortfolioNameInputTitle')}
          </Text>
          <TextInput
            selectionColor={FormColors.activeColor}
            underlineColorAndroid={
              nameActive ? FormColors.activeColor : FormColors.unactiveColor
            }
            style={textInputStyles.item}
            ref="name"
            onChangeText={(name) => this.setState({ name })}
            value={name}
            onFocus={() =>
              this.setState({
                nameActive: true,
              })
            }
            onBlur={() =>
              this.setState(
                {
                  nameActive: false,
                },
                () => this.sanitize(name)
              )
            }
            onSubmitEditing={() => this.sanitize(name)}
          />
        </View>
        <View>{this.showNameErrors()}</View>
        <View style={styles.amountContainer}>
          <Text style={styles.headings}>
            {t('CreatePortfolio.PortfolioAmountInputTitle')}
          </Text>
          <TextInput
            selectionColor={FormColors.activeColor}
            underlineColorAndroid={
              sumActive ? FormColors.activeColor : FormColors.unactiveColor
            }
            style={textInputStyles.item}
            keyboardType="numeric"
            ref="amount"
            onChangeText={(inputNumber) => this.setState({ inputNumber })}
            value={inputNumber}
            onFocus={() =>
              this.setState({
                sumActive: true,
              })
            }
            onBlur={() =>
              this.setState(
                {
                  sumActive: false,
                },
                () => this.validateAmount(inputNumber)
              )
            }
            onSubmitEditing={() => this.validateAmount(inputNumber)}
          />
        </View>
        <View>{this.showAmountErrors()}</View>
        {!loading ? (
          <View style={buttonStyles.container}>
            <TouchableOpacity
              style={buttonStyles.cancelButton}
              onPress={() => this.props.navigation.goBack()}
            >
              <Text style={buttonStyles.cancelText}>
                {t('CreatePortfolio.Cancel').toUpperCase()}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={
                createActive
                  ? buttonStyles.okButton
                  : buttonStyles.buttonDisabled
              }
              onPress={() => this.validate()}
              disabled={!createActive}
            >
              <Text style={buttonStyles.okText}>
                {t('CreatePortfolio.Save').toUpperCase()}
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={buttonStyles.container}>
            <ActivityIndicator size="large" />
          </View>
        )}
      </View>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  loading: state.portfolioListing.creatingPortfolio.loading,
  error: state.portfolioListing.creatingPortfolio.error,
  success: state.portfolioListing.creatingPortfolio.success,
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      create: createPortfolio,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreatePortfolio);

export { CreatePortfolio as CreatePortfolioTest };
