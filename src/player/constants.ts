import { PlayerState } from "./models";

export enum THEMES { DARK, LIGHT };

export const INITIAL_PLAYER_STATE: PlayerState = {
  isPlaying: true,
  theme: THEMES.DARK,
  currentTrack: null
}