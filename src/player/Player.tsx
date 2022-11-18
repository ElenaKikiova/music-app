
import React, { CSSProperties, useEffect, useState } from 'react';
import { INITIAL_PLAYER_STATE, REPEAT, THEMES } from './constants';
import Controls from './controls/Controls';
import { PlayerOptions, Track, TrackId } from './models';
import './Player.scss';
import TracksList from './tracksList/TracksList';
import { MdDarkMode, MdLightMode, MdOutlineRepeat, MdOutlineRepeatOne} from 'react-icons/md';
import { GiHamburgerMenu } from 'react-icons/gi';

function Player(options: PlayerOptions) {

  const [showSidebar, setShowSidebar] = useState<boolean>(true);

  const [playerState, setPlayerState] = useState({
    ...INITIAL_PLAYER_STATE,
    currentTrack: options.tracks[0],
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

  // toggle dark/light theme
  const toggleTheme = () => {
    setPlayerState((s) => ({...s, theme: playerState.theme === THEMES.DARK ? THEMES.LIGHT : THEMES.DARK}));
  }

  // toggle repeat audio
  const toggleRepeat = () => {
    setPlayerState((s) => ({...s, repeat: playerState.repeat === REPEAT.NEXT ? REPEAT.LOOP : REPEAT.NEXT}));
  }

  // toggle show/hide sidebar
  const toggleSidebar = () => {
    setShowSidebar((s) => !s);
  }

  return playerState.currentTrack ? (
    <div className={'theme-' +  playerState.theme}>
      <div className="Player" style={{'width': options.width ?? options.height, 'height': options.height ?? options.width}}>
        
        <button className='toggle-sidebar' onClick={toggleSidebar} title="Toggle sidebar">
          <GiHamburgerMenu />
        </button>

        <div className={'sidebar ' + (showSidebar ? 'show' : 'hide')}>

          <TracksList 
            list={options.tracks}
            currentId={playerState.currentTrack.id}
            onChangeTrack={(id) => changeTrack(id)}
          />

          <div className='buttons'>
            <button className='toggle-theme' onClick={toggleTheme} title="Change theme">
              {playerState.theme === THEMES.LIGHT ? <MdDarkMode /> : <MdLightMode />}
            </button>
            <button className='toggle-repeat' onClick={toggleRepeat} title="Repeat">
              {playerState.repeat === REPEAT.NEXT ? <MdOutlineRepeat /> : <MdOutlineRepeatOne />}
            </button>
          </div>

        </div>

        <div className='controls'>

          <div className='cover' style={{ 'backgroundImage': 'url(' + playerState.currentTrack.cover + ')' }}></div>

          <div className='info'>

            <h2>{playerState.currentTrack.name}</h2>
            <h5>{playerState.currentTrack.artist}</h5>

            <Controls 
              repeat={playerState.repeat}
              track={playerState.currentTrack} 
              onChangeTrack={(current, move) => getNextOrPreviousTrack(current, move)}
            />
          </div>

        </div>
      </div>
    </div>
  ) : <></>;
}

export default Player;
