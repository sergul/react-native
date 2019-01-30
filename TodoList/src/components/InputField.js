import React, { PureComponent } from 'react';
import { View, TextInput, StyleSheet, Keyboard } from 'react-native';
import commonStyles from '../styles/commons';

class TodoInput extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      text: ''
    };
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
    //alert('Keyboard Shown');
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
  }

  render() {
    const {
      fontFamily, isAutoFocused = false, isMultiLine = false, outerStyles, placeholderText
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
          underlineColorAndroid="transparent"
          fontFamily={fontFamily}
          autoFocus={isAutoFocused}
          multiline={isMultiLine}
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
