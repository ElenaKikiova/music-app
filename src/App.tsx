
import React from 'react';
import './App.scss';
import { Track } from './player/models';
import Player from './player/Player';

import chillHop from './tracks';

function App() {

  const tracks = chillHop() as Track[];

  console.log(tracks);

  return (
    <div className="App">
      <Player 
        width={900}
        tracks={tracks} />
    </div>
  );
}

export default App;
