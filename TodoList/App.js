import React, { Component } from 'react';
import { StyleSheet, View, Text, StatusBar, Keyboard, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import MainScreen from './src/components/MainScreen';
import CommonStyles from './src/styles/commons';
import LinearGradient from './src/components/reusable/gradient/LinearGradient';

const colorList = [
  { offset: '0', color: CommonStyles.lightBlue, opacity: '1' },
  { offset: '70%', color: CommonStyles.blue, opacity: '1' },
  { offset: '100%', color: CommonStyles.darkerBlue, opacity: '1' }
];

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    StatusBar.setBackgroundColor(CommonStyles.darkerBlue);
  }

  onSavePress = () => {
    Keyboard.dismiss();
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={this.onSavePress} accessible={false}>
        <View style={{ ...styles.container }} behavior="padding">
          <LinearGradient colorList={colorList} angle={-90} />
          <View
            style={{ ...styles.contentContainer }}
          >
            <MainScreen />
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderWidth: 0,
    borderColor: '#ff00ff'
  },

  contentContainer: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderWidth: 0
  }
});
