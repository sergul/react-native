import React, { Component } from 'react';
import { StyleSheet, View, StatusBar, ScrollView, Dimensions } from 'react-native';
import MainScreen from './src/components/add-todo/MainScreen';
import CommonStyles from './src/styles/commons';
import LinearGradient from './src/components/reusable/gradient/LinearGradient';

const colorList = [
  { offset: '0', color: CommonStyles.lighterBlue, opacity: '1' },
  { offset: '40%', color: CommonStyles.blue, opacity: '1' },
  { offset: '70%', color: CommonStyles.darkerBlue, opacity: '1' },
  { offset: '100%', color: CommonStyles.darkerBlue, opacity: '1' }
];

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    StatusBar.setBackgroundColor(CommonStyles.darkerBlue);
  }

  render() {
    return (
      <View style={{ ...styles.container }}>
        <LinearGradient colorList={colorList} angle={90} />
        <ScrollView
          style={{ ...styles.contentContainer }}
        >
          <MainScreen />
        </ScrollView>
      </View>
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
