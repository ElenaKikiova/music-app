export interface PlayerOptions {
  width: number;
  tracks: Track[];
}

export interface Track {
  title: string;
  url: string;
  coverUrl?: string;
}

export interface TracksListOptions {
  list: Track[],
  onChangeTrack: (track: Track) => void
}

export interface audioOptions {
  url: string;
  playerState: PlayerState;
}

export interface PlayerState {
  isPlaying: boolean;
  currentTrack: Track | null;
}
export interface ControlsOptions {
  url: string;

  onChangeState: Function
}


export interface ControlsState {
  isPlaying: boolean;
  currentTrack: Track;
}