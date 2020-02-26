import React, {useState, useCallback, useRef, useMemo, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {Time, Separator} from '../Timer.model';
import {Button, Text} from 'react-native-elements';
import {TimeText} from '../../reusables/components/TimeText';

export const Timer = () => {
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

  useEffect(() => {
    return () => {
      cancelAnimationFrame(requestFrameID.current);
    };
  }, []);

  const callback = useCallback((currentMilliseconds: number) => {
    const converted =
      Math.floor((currentMilliseconds - startTime.current) / 10) / 100;
    const seconds = Math.floor(converted);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    setTime({minutes, seconds, hours});
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

  return (
    <View style={{alignItems: 'center'}}>
      <View
        style={{
          flexDirection: 'row',
        }}>
        <TimeText value={hoursStr} />
        <TimeText value={minutesStr} />
        <TimeText value={secondsStr} separator={Separator.None} />
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'center'}}>
        <Button
          title={isStarted ? 'Pause' : 'Start'}
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
