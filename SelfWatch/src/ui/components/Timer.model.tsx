export enum TimerState {
  Started = "Started",
  Paused = "Paused",
  Resumed = "Resumed",
  Reset = "Reset",
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
}

export interface TimeProps {
  value: string;
  separator?: string;
}

export enum Label {
  Start = "Start",
  Pause = "Pause",
  Resume = "Resume",
  Reset = "Reset",
  Cancel = "Cancel"
}
