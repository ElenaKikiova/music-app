import { PlayerState } from "./models";

export const THEMES = { DARK: 'dark', LIGHT: 'light' };

export const INITIAL_PLAYER_STATE: PlayerState = {
  isPlaying: true,
  theme: THEMES.LIGHT,
  currentTrack: null
}