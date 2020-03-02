import {
  TimeProps,
  getScaledFontSize,
  Separator,
  FontSize,
} from '../../components/Timer.model';
import {Text} from 'react-native-elements';
import React from 'react';

export const TimeText = (props: TimeProps) => {
  const {separator, fontSize, paddingTop} = props;
  return (
    <Text
      style={{
        fontSize,
        borderWidth: 0,
        lineHeight: fontSize,
        textAlignVertical: 'center',
        includeFontPadding: false,
        paddingTop,
        textAlign: 'center',
        height: fontSize * 0.8,
      }}>{`${props.value}${separator}`}</Text>
  );
};

TimeText.defaultProps = {
  fontSize: getScaledFontSize(FontSize.StopWatch),
  separator: Separator.General,
} as Partial<TimeProps>;
