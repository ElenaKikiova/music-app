
import React, { CSSProperties, useEffect, useState } from 'react';
import { INITIAL_PLAYER_STATE, THEMES } from './constants';
import Controls from './controls/Controls';
import { PlayerOptions, Track, TrackId } from './models';
import './Player.scss';
import TracksList from './tracksList/TracksList';
import { MdDarkMode, MdLightMode} from 'react-icons/md';

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

  const toggleTheme = () => {
    console.log(playerState.theme);
    setPlayerState((s) => ({...s, theme: playerState.theme === THEMES.DARK ? THEMES.LIGHT : THEMES.DARK}));
  }

  return playerState.currentTrack ? (
    <div className={'theme-' +  playerState.theme}>
      <div className="Player" style={{'width': options.width }}>

        <div className='sidebar'>

          <TracksList 
            list={options.tracks}
            currentId={playerState.currentTrack.id}
            onChangeTrack={(id) => changeTrack(id)}
          />

          <div className='buttons'>
            <button className='toggle-theme' onClick={toggleTheme}>
              {playerState.theme === THEMES.LIGHT ? <MdDarkMode /> : <MdLightMode />}
            </button>
          </div>

        </div>

        <div className='controls'>

          <div className='cover'>
            <img src={playerState.currentTrack.cover} alt={playerState.currentTrack.name}/>
          </div>

          <h2>{playerState.currentTrack.name}</h2>
          <h5>{playerState.currentTrack.artist}</h5>

          <Controls 
            track={playerState.currentTrack} 
            onChangeTrack={(current, move) => getNextOrPreviousTrack(current, move)}
          />

        </div>
      </div>
    </div>
  ) : <></>;
}

export default Player;
