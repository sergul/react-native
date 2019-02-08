import React, { PureComponent } from 'react';
import { View, StyleSheet } from 'react-native';
import AddTodo from './AddTodo';
import TodoList from './TodoList';

class MainScreen extends PureComponent {
  render() {
    return (
      <View style={styles.container}>
        <AddTodo />
        <TodoList />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    paddingTop: 10,
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderWidth: 0,
    borderColor: 'red',
  },

  iconsContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },

  footer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'red',
  }
});

export default MainScreen;
