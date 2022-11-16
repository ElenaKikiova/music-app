
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

  const changeTrack = (t) => {
    setPlayerState((s) => ({...s, isPlaying: false, currentTrack: t}))
  }


  const stateChanged = (state: any) => {
  //   console.log('state', state);
  //   setPlayerState(state);
  }

  return playerState.currentTrack ? (
    <div className="Player" style={{'width': options.width}}>
      <TracksList list={options.tracks} onChangeTrack={(t) => changeTrack(t)}/>
      <div className='Controls'>
        <Controls url={playerState.currentTrack.url} onChangeState={stateChanged}/>
      </div>
    </div>
  ) : <></>;
}

export default Player;
