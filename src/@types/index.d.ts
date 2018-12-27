declare module 'react-native-material-dropdown' {
  class Dropdown extends React.Component<DropdownProps, any> {}
  interface DropdownProps {
    label?: string;
    error?: string;
    animationDuration?: number;
    fontSize?: number;
    labelFontSize?: number;
    baseColor?: string;
    textColor?: string;
    itemColor?: string;
    selectedItemColor?: string;
    itemCount?: number;
    itemTextStyle?: Object;
    data?: Object;
    value?: string;
    containerStyle?: Object;
    shadeOpacity?: number;
    rippleOpacity?: number;
    rippleInsets?: number;
    renderBase?: Function;
    renderAccessory?: Function;
    onChangeText?: Function;
    style?: any;
  }
  export { Dropdown };
}
