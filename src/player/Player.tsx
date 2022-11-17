
import React, { useEffect, useState } from 'react';
import { INITIAL_PLAYER_STATE } from './constants';
import Controls from './controls/Controls';
import { PlayerOptions, Track, TrackId } from './models';
import './Player.scss';
import TracksList from './tracksList/TracksList';

function Player(options: PlayerOptions) {

  const [playerState, setPlayerState] = useState({
    ...INITIAL_PLAYER_STATE,
    currentTrack: options.tracks[0]
  });

  // move -1 or +1 in the track list
  const getNextOrPreviousTrack = (currentId, move) => {
    const index = options.tracks.findIndex((e) => e.id === currentId) + move;
    if(options.tracks[index]) changeTrack(options.tracks[index].id);
  }

  // change track by finding it by id
  const changeTrack = (id: TrackId) => {
    const current = options.tracks.find((e) => e.id === id) as Track;
    setPlayerState((s) => ({...s, isPlaying: false, currentTrack: current }))
  }

  return playerState.currentTrack ? (
    <div className="Player" style={{'width': options.width}}>

      <TracksList 
        list={options.tracks}
        currentId={playerState.currentTrack.id} onChangeTrack={(id) => changeTrack(id)}
      />

      <div className='controls'>

        <div className='cover'>
          <img src={playerState.currentTrack.cover} alt={playerState.currentTrack.name}/>
        </div>

        <h2>{playerState.currentTrack.name}</h2>

        <Controls 
          track={playerState.currentTrack} 
          onChangeTrack={(current, move) => getNextOrPreviousTrack(current, move)}
        />

      </div>
    </div>
  ) : <></>;
}

export default Player;
