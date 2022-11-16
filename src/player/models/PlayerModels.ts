export interface PlayerOptions {
  width: number;
  showControls: boolean;
  tracks: string[];
}

export interface Track {

}

export interface TracksListOptions {
  list: string[]
}

export interface audioOptions {
  url: string;
  playerState: PlayerState;
}

export interface PlayerState {
  isPlaying: boolean;
  isTouched: boolean;
}
export interface ControlsOptions {
  url: string;

  onChangeState: Function
}