import {PixelRatio} from 'react-native';
import {scale} from '../reusables/utils/scaleSize';
import {Timer} from './timer/Timer';

export enum TimerState {
  Started = 'Started',
  Paused = 'Paused',
  Resumed = 'Resumed',
  Reset = 'Reset',
  Restarted = 'Restarted',
}

export interface Time {
  milliseconds?: number;
  seconds: number;
  minutes: number;
  hours: number;
}

export enum Separator {
  General = ':',
  Seconds = '.',
  None = '',
}

export interface TimeProps {
  fontSize: number;
  separator: string;
  value: string;
  paddingTop: number;
}

export enum Label {
  Start = 'Start',
  Pause = 'Pause',
  Resume = 'Resume',
  Reset = 'Reset',
  Cancel = 'Cancel',
  Restart = 'Restart',
}

export enum FontSize {
  StopWatch = 60,
  Timer = 70,
}

export const getScaledFontSize = (staticFontSize: number) =>
  Math.ceil(PixelRatio.roundToNearestPixel(scale(staticFontSize)));
