
import React, { useEffect, useState } from 'react';
import { INITIAL_PLAYER_STATE } from './constants';
import Controls from './controls/Controls';
import { PlayerOptions } from './models/PlayerModels';
import './Player.scss';
import TracksList from './tracksList/TracksList';

function Player(options: PlayerOptions) {

  const [playerState, setPlayerState] = useState({
    ...INITIAL_PLAYER_STATE,
    currentTrack: options.tracks[0]
  });

  const getNextOrPreviousTrack = (current, move) => {
    const index = options.tracks.findIndex((e) => e.audio === current) + move;
    if(options.tracks[index]) changeTrack(index);
  }

  const changeTrack = (tIndex: number) => {
    setPlayerState((s) => ({...s, isPlaying: false, currentTrack: options.tracks[tIndex]}))
  }



  return playerState.currentTrack ? (
    <div className="Player" style={{'width': options.width}}>
      <TracksList list={options.tracks} onChangeTrack={(tIndex) => changeTrack(tIndex)}/>
      <div className='Controls'>
        <Controls audio={playerState.currentTrack.audio} onChangeTrack={(current, move) => getNextOrPreviousTrack(current, move)}/>
      </div>
    </div>
  ) : <></>;
}

export default Player;
