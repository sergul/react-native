import React, { PureComponent } from 'react';
import { View, TextInput, StyleSheet, Keyboard } from 'react-native';
import commonStyles from '../../styles/commons';

class TodoInput extends PureComponent {
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

  getText = () => {
    const { text } = { ...this.state };
    return text;
  }

  render() {
    console.log('Input Field component render');
    const {
      fontFamily, isAutoFocused = false, isMultiLine = false, outerStyles, placeholderText, cursorColor
    } = { ...this.props };

    const { textInputCommons, white } = { ...commonStyles };
    const { text } = { ...this.state };
    return (
      <View style={styles.container}>
        <TextInput
          style={{ ...textInputCommons(), ...outerStyles }}
          placeholder={placeholderText}
          placeholderTextColor={white}
          onChangeText={this.textChangeHandler}
          fontFamily={fontFamily}
          autoFocus={isAutoFocused}
          multiline={isMultiLine}
          selectionColor={cursorColor}
          underlineColorAndroid="transparent"
        >
          { text }
        </TextInput>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
});

export default TodoInput;
