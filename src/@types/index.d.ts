declare module 'react-native-material-dropdown' {
  class Dropdown extends React.Component<DropdownProps, any> {
    focus(): void;
    blur(): void;
    value(): string;
    selectedIndex(): number;
    selectedItem(): Object;
    isFocused(): boolean;
  }
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
    rippleCentered?: boolean;
    renderBase?: Function;
    renderAccessory?: Function;
    onChangeText?: Function;
    style?: Object;
    overlayStyle?: Object;
    pickerStyle?: Object;
    ref?: any;
  }

  export { Dropdown };
}
