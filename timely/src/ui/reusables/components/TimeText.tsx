import {
  TimeProps,
  Separator,
  FontSize,
} from '../../components/Timer.model';
import {Text} from 'react-native-elements';
import React, { useState } from 'react';
import {LayoutChangeEvent} from 'react-native';
import { getScaledFontSize, even, scale } from '../utils/scaleSize';

export const TimeText = (props: TimeProps) => {
  const {separator, fontSize, paddingTop = 0} = props;
  const [height, setHeight] = useState(fontSize * 0.8);
  return (
    <Text
      onLayout={(event: LayoutChangeEvent) => {
        if (props.onLayout) {
          props.onLayout(event);
        }
        setHeight(event.nativeEvent.layout.height);
      }}
      style={{
        fontSize,
        borderWidth: 1,
        lineHeight: fontSize,
        textAlignVertical: 'center',
        includeFontPadding: false,
        paddingTop,
        textAlign: 'center',
        height,
      }}>{`${props.value}${separator}`}</Text>
  );
};

TimeText.defaultProps = {
  fontSize: getScaledFontSize(FontSize.StopWatch),
  separator: Separator.General,
} as Partial<TimeProps>;
