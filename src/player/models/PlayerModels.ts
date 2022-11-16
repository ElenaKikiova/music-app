export interface PlayerOptions {
  width: number;
  tracks: Track[];
}

export interface Track {
  name: string;
  audio: string;
  cover: string;
  artist: string;
  color: ["#205950", "#2ab3bf"],
  id: string,
  active: boolean
}

export interface TracksListOptions {
  list: Track[],
  onChangeTrack: (index: number) => void
}

export interface audioOptions {
  audio: string;
  playerState: PlayerState;
}

export interface PlayerState {
  isPlaying: boolean;
  currentTrack: Track | null;
}
export interface ControlsOptions {
  audio: string;

  onChangeTrack: Function
}


export interface ControlsState {
  isPlaying: boolean;
  currentTrack: Track;
}