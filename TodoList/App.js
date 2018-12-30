import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import AddTodoScreen from './src/components/add-todo/AddTodoScreen';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={{ ...styles.container }}>
        <AddTodoScreen />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
    borderWidth: 1,
    justifyContent: 'flex-start'
  }
});
