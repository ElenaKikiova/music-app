
import React, { useEffect, useRef, useState } from 'react';
import { BsPlay } from 'react-icons/bs';
import { INITIAL_PLAYER_STATE } from '../constants';
import { ControlsOptions } from '../models/PlayerModels';
import './Controls.scss';

const Controls = (options: ControlsOptions) => {

  const audioElement = useRef<HTMLAudioElement>(null);
  const progressSlider = useRef<any>(null);

  useEffect(() => {
    console.info('Loaded component controls with options', options)
  }, [options])

  const [playerState, setPlayerState] = useState(INITIAL_PLAYER_STATE);

  const togglePlayPause = () => {
    setPlayerState((s) => ({ ...s, isPlaying: !s.isPlaying}));

    if(audioElement.current){
      if (playerState.isPlaying) {
        audioElement.current.play() 
      }
      else {
        audioElement.current.pause()
      }
    }
    options.onChangeState(playerState);
  }

  const updateProgress = () => {
    if(progressSlider.current && audioElement.current){
      progressSlider.current.value = audioElement.current.currentTime / audioElement.current.duration;
    }
  }
  
  return (<>
    <audio ref={audioElement} onTimeUpdate={updateProgress}>
      <source src={options.url} type="audio/ogg" />
      <source src={options.url} type="audio/mpeg" />
    </audio>
    <div className="Controls">
      <button onClick={togglePlayPause}><BsPlay /></button>
      <progress className='progress-slider' value="0" max="1" ref={progressSlider} />
    </div></>)
}

export default Controls;
