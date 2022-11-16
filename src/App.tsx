
import React from 'react';
import './App.scss';
import { Track } from './player/models/PlayerModels';
import Player from './player/Player';

function App() {

  const tracks: Track[] = [
    {
      title: 'Sample 1',
      url: 'https://samplelib.com/lib/preview/mp3/sample-15s.mp3'
    },
    {
      title: 'Sampe 2',
      url: 'https://samplelib.com/lib/preview/mp3/sample-9s.mp3'
    }
  ];

  return (
    <div className="App">
      <Player 
        width={800}
        showControls={true}
        tracks={tracks} />
    </div>
  );
}

export default App;
