import React, { Component } from 'react';
import { StyleSheet, View, StatusBar, Keyboard, TouchableWithoutFeedback } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MainScreen from './src/components/MainScreen';
import CommonStyles from './src/styles/commons';

const colorList = [
  { offset: '0', color: CommonStyles.lightBlue, opacity: '1' },
  { offset: '70%', color: CommonStyles.blue, opacity: '1' },
  { offset: '100%', color: CommonStyles.darkerBlue, opacity: '1' }
];

class App extends Component {
  constructor(props) {
    super(props);
    StatusBar.setBackgroundColor(CommonStyles.darkerBlue);
  }

  onSavePress = () => {
    Keyboard.dismiss();
  }

  render() {
    const container = CommonStyles.containerStandard();
    return (
      <TouchableWithoutFeedback onPress={this.onSavePress} accessible={false}>
        <LinearGradient
          locations={[0, 0.5, 1]}
          colors={[CommonStyles.lightBlue, CommonStyles.blue, CommonStyles.darkerBlue]}
          style={container}
        >
          <MainScreen />
        </LinearGradient>
      </TouchableWithoutFeedback>
    );
  }
}

export default App;
