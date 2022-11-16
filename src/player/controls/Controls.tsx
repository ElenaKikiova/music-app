
import React, { useEffect, useRef, useState } from 'react';
import { BsPause, BsPlay } from 'react-icons/bs';
import { ControlsOptions } from '../models/PlayerModels';
import './Controls.scss';

const Controls = (options: ControlsOptions) => {

  const audioElement = useRef<HTMLAudioElement>(null);
  const progressSlider = useRef<any>(null);

  const [playerState, setPlayerState] = useState({
    isPlaying: false,
    url: options.url
  });

  useEffect(() => {
    setPlayerState((s) => ({...s, url: options.url}));
    setProgress(0);
    audioElement.current!.load();
    if(playerState.isPlaying) audioElement.current!.play();
  }, [options, playerState.isPlaying])

  const togglePlayPause = () => {
    if(audioElement.current){
      if (playerState.isPlaying) {
        audioElement.current.pause() 
      }
      else {
        audioElement.current.play()
      }
    }
    setPlayerState((s) => ({ ...s, isPlaying: !s.isPlaying}));
    options.onChangeState(playerState);
  }

  const updateProgress = () => {
    if(progressSlider.current && audioElement.current){
      progressSlider.current.value = audioElement.current.currentTime / audioElement.current.duration || 0;
    }
  }

  const setProgress = (sliderValue) => {
    if(audioElement.current){
      progressSlider.current.value = sliderValue;
      const seekTo = audioElement.current?.duration * sliderValue || 0;
      audioElement.current.currentTime = seekTo;
    }
  }

  const seekAudio = (e) => {
    if(audioElement.current){
      const fromBegining = e.clientX - progressSlider.current.offsetLeft;
      const sliderValue = fromBegining / progressSlider.current.clientWidth;
      setProgress(sliderValue);
      audioElement.current.play();
    }
  }
  
  return playerState.url ? (<>
    <audio ref={audioElement} onTimeUpdate={updateProgress}>
      <source src={playerState.url} type="audio/ogg" />
      <source src={playerState.url} type="audio/mpeg" />
    </audio>
    <div className="Controls">
      <button onClick={togglePlayPause}> { playerState.isPlaying ? <BsPause /> : <BsPlay />}</button>
      <progress className='progress-slider' value="0" max="1" ref={progressSlider} onClick={seekAudio} />
    </div></>) : <></>
}

export default Controls;
