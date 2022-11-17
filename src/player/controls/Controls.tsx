
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
    track: options.track,
    currentTime: '',
    duration: ''
  });

  // change track info whenever another track is chosen
  useEffect(() => {
    if(options.track.id !== playerState.track.id && audioElement.current){
      setProgress(0);
      audioElement.current!.load();
      if(playerState.isPlaying) audioElement.current!.play();
      console.log(audioElement.current!.duration);
      setPlayerState((s) => ({
        ...s, 
        track: options.track,
        duration: ''
      }));
    }
  }, [options, playerState.isPlaying, playerState.track])

  // play/pause player
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

  // convert seconds to string 'HH:mm:ss' format
  const getTime = (time) => {
    if(isNaN(time)) return '';
    const stringifiedTime = moment.utc(time*1000).format((time > 60*60 ? 'HH:' : '') + 'mm:ss')
    return stringifiedTime;
  }

  // update silder with current audio time
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

  // set audio time
  const setProgress = (sliderValue) => {
    if(audioElement.current){
      progressSlider.current.value = sliderValue;
      const seekTo = audioElement.current?.duration * sliderValue || 0;
      audioElement.current.currentTime = seekTo;
    }
  }

  // change slider value and player time
  const seekAudio = (e) => {
    if(audioElement.current){

      // calculate slider X positon by substracting slider's X position inside parent element from slider's parent X position
      const sliderOffsetLeft = progressSlider.current.offsetParent.offsetLeft - progressSlider.current.offsetLeft;
      // calculate click position inside slider
      const fromBegining = e.clientX - sliderOffsetLeft;
      // get slider value (0, 1)
      const sliderValue = fromBegining / progressSlider.current.clientWidth;

      setProgress(sliderValue);
    }
  }

  // emit event to Player component to change track
  const changeTrack = (move) => {
    options.onChangeTrack(playerState.track.id, move);
  }

  return playerState.track ? (<>

    <audio ref={audioElement} onTimeUpdate={updateProgress}>
      <source src={playerState.track.audio} type="audio/ogg" />
      <source src={playerState.track.audio} type="audio/mpeg" />
    </audio>

    <div className='actions' style={{ 'color': playerState.track.color[1] }}>
      <button onClick={() => changeTrack(-1)}> <BiSkipPrevious /> </button>
      <button className="play-pause" onClick={togglePlayPause}> { playerState.isPlaying ? <BsPause /> : <BsPlay />}</button>
      <button onClick={() => changeTrack(1)}> <BiSkipNext /> </button>
    </div>

    <div className="progress" style={{ 'color': playerState.track.color[1] }}>
      <span className='current-time'>{playerState.currentTime || '00:00'}</span>
      <progress 
        className='progress-slider'
        value="0" max="1"
        ref={progressSlider}
        onClick={seekAudio}
        style={{ 'background': playerState.track.color[1], '--progress-value-color': playerState.track.color[1] } as React.CSSProperties}
      />
      <span className='duration'>{playerState.duration || '00:00'}</span>
    </div>

  </>) : <></>
}

export default Controls;
