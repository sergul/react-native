import React, {
  useState,
  useCallback,
  useRef,
  useMemo,
  useEffect,
  useLayoutEffect,
} from 'react';
import {StyleSheet, View, Animated} from 'react-native';
import {Button} from 'react-native-elements';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {Time, Separator, TimerState, Label, FontSize} from '../Timer.model';
import {TimeText} from '../../reusables/components/TimeText';
import {getScaledFontSize} from '../../reusables/utils/scaleSize';
import {Progress} from '../Progress';
import MaskedView from '@react-native-community/masked-view';
const fontSize = getScaledFontSize(FontSize.Timer);

export const Timer = () => {
  const timeSet = useMemo(() => ({seconds: 59, minutes: 0, hours: 0}), []);
  const overallSeconds = useRef<number>(
    timeSet.seconds + timeSet.minutes * 60 + timeSet.hours * 60 * 60,
  );
  const [timeElapsed, setTime] = useState<Time>(timeSet);
  const requestFrameID = useRef(0);
  const startTime = useRef<number>(0);
  const prevSeconds = useRef<number>(0);

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
    const seconds = overallSeconds.current - Math.floor(secondsDecimal);
    if (seconds > 0) {
      requestFrameID.current = requestAnimationFrame(callback);
    }
    if (prevSeconds.current !== seconds) {
      console.log(seconds);
      setTime({
        seconds,
        minutes: Math.floor(seconds / 60),
        hours: Math.floor(seconds / 60 / 60),
      });
    }
    
    prevSeconds.current = seconds;
  }, []);

  useLayoutEffect(() => {
    if (timerState === TimerState.Started) {
      startTime.current = Date.now();
      requestAnimationFrame(callback);
    } else if (timerState === TimerState.Reset) {
      cancelAnimationFrame(requestFrameID.current);
      setTime(timeSet);
      startTime.current = 0;
    } else if (timerState === TimerState.Restarted) {
      cancelAnimationFrame(requestFrameID.current);
      setTime(timeSet);
      startTime.current = 0;
      setTimerState(TimerState.Started);
    }
  }, [timerState]);

  const onToggle = () => {
    switch (timerState) {
      case TimerState.Reset:
        setTimerState(TimerState.Started);
        break;
      case TimerState.Started:
        setTimerState(TimerState.Restarted);
        break;
      default:
        setTimerState(TimerState.Reset);
    }
  };

  const getToggleButtonLabel = () => {
    switch (timerState) {
      case TimerState.Reset:
        return Label.Start;
      case TimerState.Started:
        return Label.Restart;
      default:
        return '';
    }
  };

  const prependZero = (value: number) => `${value < 10 ? '0' : ''}${value}`;
  const hoursStr = prependZero(timeElapsed.hours % 24);
  const minutesStr = prependZero(timeElapsed.minutes % 60);
  const secondsStr = prependZero(timeElapsed.seconds % 60);

  return (
    <View
      style={{
        alignItems: 'center',
        borderWidth: 0,
        flex: 1,
        justifyContent: 'space-evenly',
      }}>
      {/* <View
        style={{
          flexDirection: 'row',
          alignItems: 'flex-end',
        }}>
        <TimeText fontSize={fontSize} value={hoursStr} />
        <TimeText fontSize={fontSize} value={minutesStr} />
        <TimeText
          fontSize={fontSize}
          value={secondsStr}
          separator={Separator.None}
        />
      </View> */}
      <View
        style={{
          alignItems: 'center',
          flexDirection: 'row',
        }}>
        <Progress isStarted={timerState === TimerState.Started} hours={hoursStr} minutes={minutesStr} seconds={secondsStr}/>
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
          title={Label.Cancel}
          disabled={timerState === TimerState.Reset}
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
