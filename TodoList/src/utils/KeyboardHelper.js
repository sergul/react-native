import { Keyboard } from 'react-native';

class KeyboardHelper {
  static isKeyboardOpen = false;

  static init = () => {
    Keyboard.addListener(
      'keyboardDidShow',
      KeyboardHelper.onKeyboardOpen,
    );
    Keyboard.addListener(
      'keyboardDidHide',
      KeyboardHelper.onKeyboardDismiss,
    );
  }

  static onKeyboardOpen = ({ endCoordinates: { height } }) => {
    KeyboardHelper.isKeyboardOpen = true;
  }

  static onKeyboardDismiss = () => {
    KeyboardHelper.isKeyboardOpen = false;
  }
}

export default KeyboardHelper;
