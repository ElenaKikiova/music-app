
import React, { useState } from 'react';
import { INITIAL_PLAYER_STATE } from './constants';
import Controls from './controls/Controls';
import { PlayerOptions } from './models/PlayerModels';
import './Player.scss';
import TracksList from './tracksList/TracksList';

function Player(options: PlayerOptions) {
  const url = 'https://www.w3schools.com/html/horse.mp3';

  const [playerState, setPlayerState] = useState(INITIAL_PLAYER_STATE);


  const stateChanged = (state: any) => {
    console.log('state', state);
    setPlayerState(state);
  }

  return (
    <div className="Player" style={{'width': options.width}}>
      <TracksList list={options.tracks} />
      <div className='Controls'>
        <Controls url={url} onChangeState={stateChanged}/>
      </div>
    </div>
  );
}

export default Player;
