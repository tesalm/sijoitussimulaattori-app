import React from 'react';
import { Text, View, FlatList } from 'react-native';
import { List, ListItem} from 'react-native-elements';
import { NavigationScreenProps } from 'react-navigation';
import { Styles } from '../styles';

import { t } from '../../assets/i18n';
import { RouteName } from '../routes';

export default class MarketScreen extends React.Component<
  NavigationScreenProps
> {
  static navigationOptions = { title: t('MarketPage.Title') };
  render() {
    return (
      <List>
        <FlatList
          data={[{key: 'a', jotain: '+4.5%'}, {key: 'b', jotain: '-3.5%'}]}
          renderItem={({ item }) => (
            <ListItem
              title={item.key}
              rightTitle = {item.jotain}
              rightTitleStyle = {{color: 'green'}}
              subtitle={item.jotain}
            />
          )}
        />
      </List>
    );
  }
}

