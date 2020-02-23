import React, {
  useState,
  useCallback,
  useRef,
  useMemo,
  useEffect,
  useLayoutEffect,
} from 'react';
import {StyleSheet, View} from 'react-native';
import {Button} from 'react-native-elements';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {Time, Separator, TimerState, Label} from '../Timer.model';
import {TimeText} from '../timer/Timer';

export const StopWatch = () => {
  const timeInitial = useMemo(
    () => ({milliseconds: 0, seconds: 0, minutes: 0, hours: 0}),
    [],
  );
  const [timePassed, setTime] = useState<Time>(timeInitial);
  const requestFrameID = useRef(0);
  const startTime = useRef<number>(0);
  const pauseTime = useRef<number>(0);

  const [timerState, setTimerState] = useState(TimerState.Reset);

  useEffect(() => {
    return () => {
      cancelAnimationFrame(requestFrameID.current);
    };
  }, []);

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

  useLayoutEffect(() => {
    if (timerState === TimerState.Started) {
      startTime.current = Date.now();
      requestAnimationFrame(callback);
    } else if (timerState === TimerState.Resumed) {
      startTime.current += Date.now() - pauseTime.current;
      requestAnimationFrame(callback);
    } else if (timerState === TimerState.Paused) {
      pauseTime.current = Date.now();
      cancelAnimationFrame(requestFrameID.current);
    } else if (timerState === TimerState.Reset) {
      cancelAnimationFrame(requestFrameID.current);
      setTime(timeInitial);
      startTime.current = 0;
    }
  }, [timerState]);

  const onToggle = () => {
    switch (timerState) {
      case TimerState.Reset:
        setTimerState(TimerState.Started);
        break;
      case TimerState.Started:
      case TimerState.Resumed:
        setTimerState(TimerState.Paused);
        break;
      case TimerState.Paused:
        setTimerState(TimerState.Resumed);
        break;
      default:
        setTimerState(TimerState.Reset);
    }
  };

  const getToggleButtonLabel = () => {
    switch (timerState) {
      case TimerState.Reset:
        return Label.Start;
      case TimerState.Paused:
        return Label.Resume;
      case TimerState.Resumed:
      case TimerState.Started:
        return Label.Pause;
      default:
        return '';
    }
  };

  const prependZero = (value: number) => `${value < 10 ? '0' : ''}${value}`;
  const hoursStr = prependZero(timePassed.hours % 24);
  const minutesStr = prependZero(timePassed.minutes % 60);
  const secondsStr = prependZero(timePassed.seconds % 60);
  const millisecondsStr = prependZero(timePassed.milliseconds || 0);

  return (
    <View
      style={{
        alignItems: 'center',
        borderWidth: 1,
        flex: 1,
        justifyContent: 'space-around',
      }}>
      <View
        style={{
          flexDirection: 'row',
        }}>
        <TimeText value={hoursStr} separator={Separator.General} />
        <TimeText value={minutesStr} separator={Separator.General} />
        <TimeText value={secondsStr} separator={Separator.Seconds} />
        <TimeText value={millisecondsStr} />
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          width: '100%',
        }}>
        <Button
          title={getToggleButtonLabel()}
          buttonStyle={{width: 100, borderRadius: 4}}
          onPress={onToggle}></Button>
        <Button
          title={Label.Reset}
          buttonStyle={{width: 100, borderRadius: 4}}
          onPress={() => {
            setTimerState(TimerState.Reset);
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
