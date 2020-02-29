import {PixelRatio} from 'react-native';
import {scale} from '../reusables/utils/scaleSize';

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

export const timeFontSize = Math.ceil(
  PixelRatio.roundToNearestPixel(scale(60)),
);
