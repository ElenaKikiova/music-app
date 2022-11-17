export interface PlayerOptions {
  width?: number | string;
  height?: number | string;
  tracks: Track[];
}

export type TrackId = {
  id: number | string;
}

export interface Track {
  name: string;
  audio: string;
  cover: string;
  artist: string;
  color: string[],
  id: TrackId,
  active: boolean
}

export interface TracksListOptions {
  list: Track[],
  currentId: TrackId,
  onChangeTrack: (id: TrackId) => void
}

export interface PlayerState {
  isPlaying: boolean;
  theme: string;
  currentTrack: Track | null;
  repeat: string;
  volume: number;
  currentTime: string;
  duration: string;
}
export interface ControlsOptions {
  track: Track;
  repeat: string;
  onChangeTrack: (currentId: TrackId, move: number) => void
}

export interface ControlsState {
  isPlaying: boolean;
  currentTrack: Track;
}