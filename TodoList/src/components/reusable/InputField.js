import React, { PureComponent } from 'react';
import { View, TextInput, Keyboard } from 'react-native';
import commonStyles from '../../styles/commons';

class InputField extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      text: ''
    };
    if (props.returnTextCallback) {
      props.returnTextCallback(this.getText);
    }

    if (props.textInputRefCallback) {
      props.textInputRefCallback(this.getRef);
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

  onKeyboardOpen = ({ endCoordinates: { height } }) => {
  }

  onKeyboardDismiss = () => {
    this.setState((prevState) => {
      return { text: prevState.text.trim() };
    });
  }

  textChangeHandler = (value) => {
    this.setState(() => {
      console.log(`text in textChangeHandler = ${value}`);
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

  touchEndHandler = () => {
    const { touchEndCallback } = { ...this.props };
    if (touchEndCallback) {
      touchEndCallback();
    }
  }

  touchStartHandler = () => {
    const { touchStartCallback } = { ...this.props };
    if (touchStartCallback) {
      touchStartCallback();
    }
  }

  blurHandler = () => {
    const { blurCallback } = { ...this.props };
    if (blurCallback) {
      blurCallback();
    }
  }

  focusHandler = () => {
    const { focusCallback } = { ...this.props };
    if (focusCallback) {
      focusCallback();
    }
  }

  getText = () => {
    const { text } = { ...this.state };
    return text;
  }

  getRef = () => {
    return this._myRef;
  }

  componentDidUpdate = () => {
    const { needsFocus } = { ...this.props };
    if (needsFocus && this._myRef && !this._myRef.isFocused()) {
      this._myRef.focus();
    }
  }

  render() {
    const {
      fontFamily, isAutoFocused = false, isEditable = true, isMultiLine = false, isCaretHidden = false, outerStyles, placeholderText, cursorColor, text: textFromProps
    } = { ...this.props };

    const { text: textFromState } = { ...this.state };

    const { textInput, white } = { ...commonStyles };

    let text = textFromProps;
    if (!text) {
      text = textFromState;
    }

    return (
      <View style={commonStyles.containerStandard()}>
        <TextInput
          style={{ ...textInput(), ...outerStyles }}
          ref={(ref) => {
            if (ref) {
              this._myRef = ref;
            }
          }}
          onTouchEnd={this.touchEndHandler}
          onTouchStart={this.touchStartHandler}
          onBlur={this.blurHandler}
          onFocus={this.focusHandler}
          placeholder={placeholderText}
          placeholderTextColor={white}
          onChangeText={this.textChangeHandler}
          fontFamily={fontFamily}
          autoFocus={isAutoFocused}
          caretHidden={isCaretHidden}
          editable={isEditable}
          multiline={isMultiLine}
          selectionColor={cursorColor}
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
