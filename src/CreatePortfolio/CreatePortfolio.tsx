import React from 'react';
import { Text, TextInput, View, TouchableOpacity } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import validator from 'validator';

import { t } from '../assets/i18n';
import { RouteName } from '../navigation/routes';
import { RootState } from '../redux/reducers';
import { CreateNewPortfolio } from './actions';
import { CreatePortfolioStyles as styles } from './styles';
import { FormColors } from '../App/colors';
import { buttonStyles, textInputStyles } from '../App/styles';

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
  nameActive: boolean;
  sumActive: boolean;
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
      nameActive: false,
      sumActive: false,
    };
  }

  static navigationOptions = {
    header: null,
  };

  sanitize(input: string) {
    const trimWhitespaces = validator.trim(input);
    if (trimWhitespaces === '') {
      this.setState({
        errorMessageTranslationKey: 'InputErrors.NameEmpty',
        nameError: true,
      });
    } else {
      this.setState({ name: trimWhitespaces, nameError: false });
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

  render() {
    const { nameActive, sumActive, name, inputNumber } = this.state;
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
            onBlur={() => this.setState({ nameActive: false })}
          />
        </View>
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
            onFocus={() => this.setState({ sumActive: true })}
            onBlur={() => this.setState({ sumActive: false })}
          />
        </View>
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
            style={buttonStyles.okButton}
            onPress={() => this.validate()}
          >
            <Text style={buttonStyles.okText}>
              {t('CreatePortfolio.Save').toUpperCase()}
            </Text>
          </TouchableOpacity>
        </View>
        <View>{this.showErrors()}</View>
      </View>
    );
  }
}

const mapStateToProps = (state: RootState) => ({});

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
