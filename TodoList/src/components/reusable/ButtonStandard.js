import React from 'react';
import { View, Text, StyleSheet, Animated, Easing, PanResponder } from 'react-native';
import measureComponent from '../../utils/Measurer';
import commonStyles from '../../styles/commons';

/**
 * <Button
      label="Save"
      width={this._screenWidth * 0.3}
      height={(this._screenWidth * 0.3) * 0.3}
      bgColor={commonStyles.orange}
      pressOutCallback={this.onSavePress}
    />
 * @param
 */

const ButtonStandard = (props) => {
  const { label = 'Button', width = 120, height = 30, pressOutCallback, bgColor = commonStyles.brown, bgColorPressed = commonStyles.lightBrown, backgroundOpacity = 0.4 } = { ...props };
  let _value = 1;
  let _pressOutPos = {};
  let _myRef;
  let touchBoxWidth = width;
  let touchBoxHeight = height;
  const PRESS_IN_SCALE_DURATION = 60;
  const PRESS_OUT_SCALE_DURATION = 100;
  const PRESS_IN_BG_DURATION = 20;
  const PRESS_OUT_BG_DURATION = 500;
  const PRESS_IN_END_VALUE = 0.9;
  const PRESS_OUT_END_VALUE = 1;
  const myPos = { x: 0, y: 0 };

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => {
      onPressInHandler();
      return true;
    },
    onPanResponderEnd: (e, gestureState) => {
      _pressOutPos = { ...gestureState };
      onPressOutHandler();
      return true;
    },
    onPanResponderRelease: (evt, gestureState) => {
      _pressOutPos = { ...gestureState };
    }
  });

  const scaleValue = new Animated.Value(_value);
  const scaleRules = scaleValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1]
  });
  const bgColorValue = new Animated.Value(0);
  const bgColorRules = bgColorValue.interpolate({
    inputRange: [0, 1],
    outputRange: [bgColor, bgColorPressed]
  });

  scaleValue.addListener(({ value }) => {
    _value = value;
  });

  const onPressInHandler = () => {
    scaleValue.setValue(_value);
    Animated.timing(scaleValue, {
      toValue: PRESS_IN_END_VALUE,
      duration: _value * PRESS_IN_SCALE_DURATION,
      easing: Easing.linear,
      useNativeDriver: true
    }).start();

    Animated.timing(bgColorValue, {
      toValue: 1,
      duration: PRESS_IN_BG_DURATION,
      easing: Easing.linear
    }).start();
  };

  const validatePressOutCallback = () => {
    if ((_pressOutPos.moveX === 0 && _pressOutPos.moveY === 0)
        || (_pressOutPos.moveX > myPos.x && _pressOutPos.moveY > myPos.y
        && _pressOutPos.moveX < (myPos.x + touchBoxWidth) && _pressOutPos.moveY < (myPos.y + touchBoxHeight))) {
      if (pressOutCallback) {
        pressOutCallback.call();
      }
    }
  };

  const onPressOutHandler = () => {
    updateTouchBoxPositionOnScreen(() => {
      scaleValue.setValue(_value);
      Animated.timing(scaleValue, {
        toValue: PRESS_OUT_END_VALUE,
        duration: _value * PRESS_OUT_SCALE_DURATION,
        easing: Easing.linear,
        useNativeDriver: true
      }).start(validatePressOutCallback);

      Animated.timing(bgColorValue, {
        toValue: 0,
        duration: PRESS_OUT_BG_DURATION,
        easing: Easing.linear
      }).start();
    });
  };

  const updateTouchBoxPositionOnScreen = (onUpdateCallback) => {
    measureComponent(_myRef).then((measures) => {
      myPos.x = measures.x - (measures.width * (Number((1 - _value).toFixed(1)) / 2));
      myPos.y = measures.y;
      touchBoxHeight = measures.height;
      touchBoxWidth = measures.width;
      if (onUpdateCallback) {
        onUpdateCallback();
      }
    }).catch((error) => {
      console.log(error);
    });
  };

  const transformedStyle = {
    transform: [{ scale: scaleRules }],
    padding: 0
  };

  const bgColorChangeStyle = {
    backgroundColor: bgColorRules,
    width,
    height,
    borderRadius: commonStyles.borderRadius,
    position: 'absolute',
    borderWidth: 0.5,
    borderColor: commonStyles.lightGray,
    opacity: backgroundOpacity
  };

  const touchBox = { padding: 10, backgroundColor: commonStyles.transparent };

  const contentContainer = {
    ...styles.container,
    borderRadius: commonStyles.borderRadius,
    width,
    height
  };

  return (
    <View
      ref={(ref) => {
        _myRef = ref;
      }}
      onLayout={() => {
        updateTouchBoxPositionOnScreen();
      }}
      style={touchBox}
      {...panResponder.panHandlers}
    >
      <Animated.View
        style={transformedStyle}
      >
        <Animated.View
          style={bgColorChangeStyle}
        >
        </Animated.View>
        <View
          style={{ ...contentContainer }}
        >
          <Text style={{ ...styles.label, color: commonStyles.white }}>{ label }</Text>
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 0,
    paddingBottom: 2
  },

  label: {
    fontSize: 15
  }
});

export default ButtonStandard;
