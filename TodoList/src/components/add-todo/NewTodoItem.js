import React, { PureComponent } from 'react';
import { View } from 'react-native';
import TodoInput from '../InputField';

class NewTodoItem extends PureComponent {
  render() {
    return (
      <View>
        <TodoInput
          fontFamily="OpenSans-Regular"
          isMultiLine
          outerStyles={{ borderWidth: 0, width: '80%', fontSize: 20 }}
          placeholderText="I want to ..."
        />
      </View>
    );
  }
}

export default NewTodoItem;
