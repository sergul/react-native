import React, { Component } from 'react';
import { StatusBar, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MainScreen from './src/components/MainScreen';
import CommonStyles from './src/styles/commons';
import KeyboardHelper from './src/utils/KeyboardHelper';

class App extends Component {
  constructor(props) {
    super(props);
    StatusBar.setBackgroundColor(CommonStyles.darkerBlue);
    KeyboardHelper.init();
  }

  render() {
    const container = CommonStyles.containerStandard();
    return (
      <View
        style={container}
      >
        <LinearGradient
          locations={[0, 0.5, 1]}
          colors={[CommonStyles.lightBlue, CommonStyles.blue, CommonStyles.darkerBlue]}
          style={container}
        >
          <MainScreen />
        </LinearGradient>
      </View>
    );
  }
}

export default App;
