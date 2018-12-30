import React from 'react';
import { View, Text, StyleSheet, Animated, Easing, PanResponder } from 'react-native';
import measureComponent from '../utils/Measurer';


const ButtonCommon = (props) => {
  const { size, pressOutCallback, bgColor = '#ff0000', label = 'Button' } = { ...props };
  let _value = 1;
  let _pressOutPos = {};
  let _myRef;
  const PRESS_IN_DURATION = 100;
  const PRESS_OUT_DURATION = 200;
  const PRESS_IN_END_VALUE = 0.9;
  const PRESS_OUT_END_VALUE = 1;
  const myPos = { x: 0, y: 0 };

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: (evt, gestureState) => {
      onPressInHandler();
      return true;
    },
    onPanResponderEnd: (e, gestureState) => {
      _pressOutPos = { ...gestureState };
      onPressOutHandler();
      return true;
    },
    onPanResponderGrant: (evt, gestureState) => {
    },
    onPanResponderMove: (evt, gestureState) => {
    },
    onPanResponderRelease: (evt, gestureState) => {
      _pressOutPos = { ...gestureState };
      onPressOutHandler();
    }
  });

  const scaleValue = new Animated.Value(_value);
  const scaleRules = scaleValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1]
  });

  scaleValue.addListener(({ value }) => {
    _value = value;
  });

  const onPressInHandler = () => {
    scaleValue.setValue(_value);
    Animated.timing(scaleValue, {
      toValue: PRESS_IN_END_VALUE,
      duration: _value * PRESS_IN_DURATION,
      easing: Easing.linear,
      useNativeDriver: true
    }).start();
  };

  const pressOutAnimationHandler = () => {
    if ((_pressOutPos.moveX === 0 && _pressOutPos.moveY === 0)
        || (_pressOutPos.moveX > myPos.x && _pressOutPos.moveY > myPos.y
        && _pressOutPos.moveX < (myPos.x + size.width) && _pressOutPos.moveY < (myPos.y + size.height))) {
      pressOutCallback.call();
    }
  };

  const onPressOutHandler = () => {
    updatePositionOnScreen(() => {
      scaleValue.setValue(_value);
      Animated.timing(scaleValue, {
        toValue: PRESS_OUT_END_VALUE,
        duration: _value * PRESS_OUT_DURATION,
        easing: Easing.linear,
        useNativeDriver: true
      }).start(pressOutAnimationHandler);
    });
  };

  const updatePositionOnScreen = (onUpdateCallback) => {
    measureComponent(_myRef).then((measures) => {
      myPos.x = measures.x - (measures.width * (Number((1 - _value).toFixed(1)) / 2));
      myPos.y = measures.y;
      if (onUpdateCallback) {
        onUpdateCallback();
      }
    }).catch((error) => {
      console.log(error);
    });
  };

  const { width = 120, height = 40 } = { ...size };
  const transformedStyle = {
    transform: [{ scale: scaleRules }],
    padding: 0
  };
  const contentContainer = { ...styles.animatedView, width, height, backgroundColor: bgColor };
  return (
    <Animated.View
      style={transformedStyle}
    >
      <View
        ref={(ref) => {
          _myRef = ref;
        }}
        onLayout={(event) => {
          updatePositionOnScreen();
        }}
        style={contentContainer}
        {...panResponder.panHandlers}
      >
        <Text>{ label }</Text>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  animatedView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: '5%',
    paddingRight: '5%',
    paddingTop: 0,
    paddingBottom: 0
  },

  text: {
    fontSize: 20
  }
});

export default ButtonCommon;
