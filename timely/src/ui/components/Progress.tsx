import React, {useState, useEffect, useRef, useLayoutEffect} from 'react';
import {View, LayoutChangeEvent, Animated} from 'react-native';
import MaskedView from '@react-native-community/masked-view';
import {TimeText} from '../reusables/components/TimeText';
import {Separator} from './Timer.model';
import {getScaledFontSize} from '../reusables/utils/scaleSize';

interface Props {
  isStarted?: boolean;
  hours: string;
  minutes: string;
  seconds: string;
}

export const Progress = (props: Props) => {
  const isStarted = props.isStarted;
  const isMeasured = useRef<boolean>(false);
  const fontSize = getScaledFontSize(65);
  const [maskHeight, setMaskHeight] = useState(20);
  const [heightValue] = useState(new Animated.Value(0));
  const [heightValue1, setHeightValue1] = useState(
    new Animated.Value(maskHeight),
  );
  const AnimatedMaskedView = Animated.createAnimatedComponent(MaskedView);

  useLayoutEffect(() => {
    if (isStarted) {
      Animated.timing(heightValue, {
        toValue: maskHeight,
        duration: 10000,
      }).start();
      Animated.timing(heightValue1, {
        toValue: 0,
        duration: 10000,
      }).start();
    }
  }, [isStarted]);
  return (
    <AnimatedMaskedView
      style={{
        flex: 1,
        height: maskHeight,
        width: '100%',
        flexDirection: 'column',
        borderWidth: 0,
      }}
      maskElement={
        <View
          style={{
            // Transparent background because mask is based off alpha channel.
            backgroundColor: 'transparent',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
            flexDirection: 'row',
          }}>
          <TimeText
            fontSize={fontSize}
            value={props.hours}
            onLayout={(event: LayoutChangeEvent) => {
              setHeightValue1(
                new Animated.Value(event.nativeEvent.layout.height),
              );
              setMaskHeight(event.nativeEvent.layout.height);
              isMeasured.current = true;
            }}></TimeText>
          <TimeText fontSize={fontSize} value={props.minutes} />
          <TimeText
            fontSize={fontSize}
            value={props.seconds}
            separator={Separator.None}
          />
        </View>
      }>
      {/* Shows behind the mask */}
      <Animated.View style={{backgroundColor: 'green', height: heightValue1}} />
      <Animated.View style={{backgroundColor: 'red', height: heightValue}} />
    </AnimatedMaskedView>
  );
};
