import React, { PureComponent } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import commonStyles from '../styles/commons';

class TodoInput extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
    };
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
      fontFamily, isAutoFocused = false, isMultiLine = false, outerStyles
    } = { ...this.props };

    const { textInputCommons, middleGray } = { ...commonStyles };
    return (
      <View style={styles.container}>
        <TextInput
          style={{ ...textInputCommons(), ...outerStyles }}
          placeholder="I want to ..."
          placeholderTextColor={middleGray}
          onChangeText={this.textChangeHandler}
          underlineColorAndroid="transparent"
          fontFamily={fontFamily}
          autoFocus={isAutoFocused}
          multiline={isMultiLine}
        />
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
