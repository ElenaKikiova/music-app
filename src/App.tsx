
import React from 'react';
import './App.scss';
import Player from './player/Player';

function App() {

  const tracks: string[] = ['1.mp4', '2.mp4'];

  return (
    <div className="App">
      <Player 
        width={800}
        tracks={tracks} />
    </div>
  );
}

export default App;
