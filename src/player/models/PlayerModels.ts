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
  id: any,
  active: boolean
}

export interface TracksListOptions {
  list: Track[],
  currentId: number,
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
  track: Track;

  onChangeTrack: Function
}


export interface ControlsState {
  isPlaying: boolean;
  currentTrack: Track;
}