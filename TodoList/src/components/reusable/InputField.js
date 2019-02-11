import React, { PureComponent } from 'react';
import { View, TextInput, StyleSheet, Keyboard } from 'react-native';
import commonStyles from '../../styles/commons';

class InputField extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      text: ''
    };
    if (props.returnText) {
      props.returnText(this.getText);
    }
  }

  componentDidMount() {
    this.keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      this.onKeyboardOpen,
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      this.onKeyboardDismiss,
    );
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  onKeyboardOpen = () => {
  }

  onKeyboardDismiss = () => {
    this.setState((prevState) => {
      return { text: prevState.text.trim() };
    });
  }

  textChangeHandler = (value) => {
    this.setState(() => {
      return {
        text: value
      };
    });
    const { changeTextCallback } = { ...this.props };
    const { text } = { ...this.state };
    if (changeTextCallback) {
      changeTextCallback(text);
    }
  }

  enterPressHandler = () => {
    const { enterPressCallback } = { ...this.props };
    if (enterPressCallback) {
      enterPressCallback();
    }
  }

  getText = () => {
    const { text } = { ...this.state };
    return text;
  }

  clearAndRetainFocus = (event) => {
    console.log(event);
  }

  render() {
    const {
      fontFamily, isAutoFocused = false, isMultiLine = false, outerStyles, placeholderText, cursorColor, text
    } = { ...this.props };

    const { textInput, white } = { ...commonStyles };
    return (
      <View style={commonStyles.containerStandard()}>
        <TextInput
          style={{ ...textInput(), ...outerStyles }}
          placeholder={placeholderText}
          placeholderTextColor={white}
          onChangeText={this.textChangeHandler}
          fontFamily={fontFamily}
          autoFocus={isAutoFocused}
          multiline={isMultiLine}
          selectionColor={cursorColor}
          underlineColorAndroid="transparent"
          onSubmitEditing={this.enterPressHandler}
          blurOnSubmit={false}
        >
          { text }
        </TextInput>
      </View>
    );
  }
}

export default InputField;
