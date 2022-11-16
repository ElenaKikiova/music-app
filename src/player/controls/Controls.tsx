
import React, { useEffect, useRef, useState } from 'react';
import { BsPause, BsPlay } from 'react-icons/bs';
import { BiSkipPrevious, BiSkipNext } from 'react-icons/bi';
import { ControlsOptions } from '../models/PlayerModels';
import './Controls.scss';
import moment from 'moment';

const Controls = (options: ControlsOptions) => {

  const audioElement = useRef<HTMLAudioElement>(null);
  const progressSlider = useRef<any>(null);

  const [playerState, setPlayerState] = useState({
    isPlaying: false,
    audio: options.audio,
    currentTime: '',
    duration: ''
  });

  useEffect(() => {
    if(options.audio !== playerState.audio && audioElement.current){
      setProgress(0);
      audioElement.current!.load();
      if(playerState.isPlaying) audioElement.current!.play();
      console.log(audioElement.current!.duration);
      setPlayerState((s) => ({
        ...s, 
        audio: options.audio,
        duration: ''
      }));
    }
  }, [options, playerState.isPlaying, playerState.audio])

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
  }

  const getTime = (time) => {
    if(isNaN(time)) return '';
    const stringifiedTime = moment.utc(time*1000).format((time > 60*60 ? 'HH:' : '') + 'mm:ss')
    return stringifiedTime;
  }

  const updateProgress = () => {
    if(progressSlider.current && audioElement.current){
      setPlayerState((s) => ({
        ...s, 
        currentTime: getTime(audioElement.current?.currentTime),
        ...(playerState.duration === '' && { duration: getTime(audioElement.current!.duration)})
      }));
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
    }
  }

  const changeTrack = (move) => {
    console.log(move, options);
    options.onChangeTrack(options.audio, move);
  }

  
  return playerState.audio ? (<>
    <audio ref={audioElement} onTimeUpdate={updateProgress}>
      <source src={playerState.audio} type="audio/ogg" />
      <source src={playerState.audio} type="audio/mpeg" />
    </audio>
    <div className='Actions'>
      <button className="PreviousTrack" onClick={() => changeTrack(-1)}> <BiSkipPrevious /> </button>
      <button className="PlayPause" onClick={togglePlayPause}> { playerState.isPlaying ? <BsPause /> : <BsPlay />}</button>
      <button className="NextTrack" onClick={() => changeTrack(1)}> <BiSkipNext /> </button>
    </div>

    <div className="Progress">
      <span className='current-time'>{playerState.currentTime || '00:00'}</span>
      <progress className='progress-slider' value="0" max="1" ref={progressSlider} onClick={seekAudio} />
      <span className='duration'>{playerState.duration || '00:00'}</span>
    </div>

    </>) : <></>
}

export default Controls;
