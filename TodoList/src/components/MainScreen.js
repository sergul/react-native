import React, { PureComponent } from 'react';
import { View, StyleSheet } from 'react-native';
import AddTodo from './AddTodo';
import TodoList from './TodoList';
import CommonStyles from '../styles/commons';

class MainScreen extends PureComponent {
  render() {
    const container = CommonStyles.containerStandard();
    container.justifyContent = 'flex-start';
    container.paddingTop = 10;
    return (
      <View style={container}>
        <AddTodo />
        <TodoList />
      </View>
    );
  }
}

export default MainScreen;
