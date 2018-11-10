import React from 'react';
import { NavigationScreenProps } from 'react-navigation';

import AnonymousLoginField from './AnonymousLoginField';

export class LoginScreen extends React.Component<NavigationScreenProps> {
  constructor(props: NavigationScreenProps){
    super(props);
  }

  render(){ return <AnonymousLoginField />; }
}
