
import React from 'react';
import Controls from './controls/Controls';
import { PlayerOptions } from './models/PlayerModels';
import './Player.scss';
import TracksList from './tracksList/TracksList';
import Video from './video/Video';

function Player(options: PlayerOptions) {
  const url = 'https://www.w3schools.com/html/mov_bbb.mp4';
  return (
    <div className="Player" style={{'width': options.width}}>
      <TracksList list={options.tracks} />
      <div className='video-and-controls'>
        <Video url={url} />
        <Controls show={options.showControls} />
      </div>
    </div>
  );
}

export default Player;
