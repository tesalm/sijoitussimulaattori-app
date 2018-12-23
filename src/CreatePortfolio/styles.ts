import { StyleSheet } from 'react-native';

import { Colors } from '../App/colors';

const CreatePortfolioStyles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    marginTop: 8,
    marginBottom: 8,
    marginLeft: 16,
    marginRight: 16,
  },
  main: {
    fontFamily: 'Roboto',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'left',
    color: Colors.baseColor,
  },
  textinput: {
    marginTop: 8,
    marginBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: Colors.textInputBottomBorder,
    height: 40,
    color: Colors.textInputText,
  },
  error: {
    color: Colors.errorText,
  },
});

export { CreatePortfolioStyles };
