import React, { PureComponent } from 'react';
import { View, Button, StyleSheet, Keyboard, Dimensions } from 'react-native';
import NewTodoItem from './NewTodoItem';

class MainScreen extends PureComponent {
  onSavePress = () => {
    Keyboard.dismiss();
  }

  render() {
    return (
      <View style={styles.container}>
        <NewTodoItem />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },

  iconsContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default MainScreen;
