import React, {useState, useCallback, useRef, useMemo} from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

interface Time {
  milliseconds: number;
  seconds: number;
  minutes: number;
  hours: number;
}

enum Separators {
  general = ':',
  seconds = '.',
}

interface TimeProps {
  value: string;
  separator?: string;
}

const TimeText = (props: TimeProps) => {
  const {separator = ''} = props;
  return <Text>{`${props.value}${separator}`}</Text>;
};

export const StopWatch = () => {
  const timeInitial = useMemo(
    () => ({milliseconds: 0, seconds: 0, minutes: 0, hours: 0}),
    [],
  );
  const [timePassed, setTime] = useState<Time>(timeInitial);
  const [isStarted, toggleTimer] = useState<boolean>(false);
  const [isReset, resetTimer] = useState<boolean>(false);
  const requestFrameID = useRef(0);
  const startTime = useRef(0);
  const pauseTime = useRef(0);
  const callback = useCallback((currentMilliseconds: number) => {
    // converts to seconds by cutting the last digit
    const secondsDecimal =
      Math.floor((currentMilliseconds - startTime.current) / 10) / 100;
    const seconds = Math.floor(secondsDecimal);
    // time passed in milliseconds
    const milliseconds = Math.floor((secondsDecimal - seconds) * 100);
    // time passed in minutes
    const minutes = Math.floor(seconds / 60);
    // time passed in hours
    const hours = Math.floor(minutes / 60);
    setTime({
      milliseconds,
      minutes,
      seconds,
      hours,
    });
    requestFrameID.current = requestAnimationFrame(callback);
  }, []);

  const onStartPause = () => {
    if (!isStarted) {
      if (startTime.current === 0) {
        startTime.current = Date.now();
      } else {
        startTime.current += Date.now() - pauseTime.current;
      }
      requestAnimationFrame(callback);
      resetTimer(false);
    } else {
      pauseTime.current = Date.now();
      cancelAnimationFrame(requestFrameID.current);
    }
    toggleTimer(!isStarted);
  };

  const prependZero = (value: number) => `${value < 10 ? '0' : ''}${value}`;
  const hoursStr = prependZero(timePassed.hours % 24);
  const minutesStr = prependZero(timePassed.minutes % 60);
  const secondsStr = prependZero(timePassed.seconds % 60);
  const millisecondsStr = prependZero(timePassed.milliseconds);

  return (
    <View style={{alignItems: 'center'}}>
      <Text>Hi I'm Stop watch</Text>
      <View
        style={{
          flexDirection: 'row',
        }}>
        <TimeText value={hoursStr} separator={Separators.general} />
        <TimeText value={minutesStr} separator={Separators.general} />
        <TimeText value={secondsStr} separator={Separators.seconds} />
        <TimeText value={millisecondsStr} />
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'center'}}>
        <Button
          title={isStarted ? 'Stop' : 'Start'}
          onPress={onStartPause}></Button>
        <Button
          title="Reset"
          onPress={() => {
            if (!isReset) {
              cancelAnimationFrame(requestFrameID.current);
              setTime(timeInitial);
              startTime.current = 0;
              toggleTimer(false);
            }
            resetTimer(true);
          }}></Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
});
