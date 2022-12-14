import { PlayerState } from "./models";

export const THEMES = { DARK: 'dark', LIGHT: 'light' };
export const REPEAT = { LOOP: 'loop', NEXT: 'next' };

export const INITIAL_PLAYER_STATE: PlayerState = {
  isPlaying: false,
  theme: THEMES.DARK,
  currentTrack: null,
  volume: 0.75,
  repeat: REPEAT.NEXT,
  currentTime: '',
  duration: '',
  muted: false
}