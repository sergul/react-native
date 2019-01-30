import React, { Component } from 'react';
import { View, Text, Button, Animated, Easing } from 'react-native';
import CommonStyles from '../styles/commons';

class Box extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.value = new Animated.Value(0);
    this.bgColor = this.value.interpolate({
      inputRange: [0, 1],
      outputRange: ['red', CommonStyles.mainBlue]
    });
    this.targetValue = 1;
  }

  handlePress = () => {
    Animated.timing(this.value, {
      toValue: this.targetValue,
      duration: 2000,
      easing: Easing.linear
    }).start();
    this.targetValue = this.targetValue === 1 ? 0 : 1;
  }

  render() {
    const boxStyle = { backgroundColor: this.bgColor, height: 200, width: 200 };
    return (
      <View>
        <Animated.View style={boxStyle} />
        <Button
          title="Start"
          onPress={this.handlePress}
        />
      </View>
    );
  }
}

export default Box;
