import {LayoutChangeEvent} from 'react-native';
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
  onLayout: (event: LayoutChangeEvent) => void;
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