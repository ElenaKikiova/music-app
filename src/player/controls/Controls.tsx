
import React, { CSSProperties, useEffect, useRef, useState } from 'react';
import { BsPause, BsPlay } from 'react-icons/bs';
import { BiSkipPrevious, BiSkipNext } from 'react-icons/bi';
import { ControlsOptions } from '../models';
import './Controls.scss';
import moment from 'moment';
import { INITIAL_PLAYER_STATE, REPEAT } from '../constants';

const Controls = (options: ControlsOptions) => {

  const audioElement = useRef<HTMLAudioElement>(null);
  const progressSlider = useRef<any>(null);

  const [playerState, setPlayerState] = useState({
    ...INITIAL_PLAYER_STATE,
    track: options.track,
  });

  // change track info whenever another track is chosen
  useEffect(() => {
    if(options.track.id !== playerState.track.id && audioElement.current){
      setProgress(0);
      audioElement.current!.load();
      if(playerState.isPlaying) audioElement.current!.play();
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

      // if audio seek is programatic
      if(typeof e === 'number') {
        setProgress(0);
        audioElement.current.play();
      }
      else {
        // audio seek occured because user clicked on slider

        // get slider X positon
        const sliderOffsetLeft = progressSlider.current.getBoundingClientRect().x;
        // calculate click position inside slider
        const fromBegining = e.clientX - sliderOffsetLeft;
        // get slider value (0, 1)
        const sliderValue = fromBegining / progressSlider.current.clientWidth;

        console.log(sliderOffsetLeft, e.clientX, fromBegining, progressSlider.current.offsetLeft, sliderValue)

        setProgress(sliderValue);
      }
    }
  }

  // emit event to Player component to change track
  const changeTrack = (move) => {
    options.onChangeTrack(playerState.track.id, move);
  }

  // determine weather to loop audio or go to next track
  const audioEnded = () => {
    if(options.repeat === REPEAT.LOOP) seekAudio(1);
    else changeTrack(1);
  }

  const changeVolume = (e) => {
    if(audioElement.current){
      const volume = +e.target.value;
      console.log(e, volume, audioElement.current.volume);
      // e.target.innerHTML = e.value;
      audioElement.current.volume = volume;
      setPlayerState((s) => ({...s, volume: volume}));
    }
  }

  return playerState.track ? (<>

    <audio ref={audioElement} onTimeUpdate={updateProgress} onEnded={audioEnded}>
      <source src={playerState.track.audio} type="audio/ogg" />
      <source src={playerState.track.audio} type="audio/mpeg" />
    </audio>

    <div className='actions' style={{ 'color': playerState.track.color[1] }}>
      <button onClick={() => changeTrack(-1)}> <BiSkipPrevious /> </button>
      <button className="play-pause" onClick={togglePlayPause}> { playerState.isPlaying ? <BsPause /> : <BsPlay />}</button>
      <button onClick={() => changeTrack(1)}> <BiSkipNext /> </button>

      <input 
        type="range" min="0" max="1" step="0.05"
        value={playerState.volume} 
        className="volume-slider" 
        onChange={changeVolume} />

    </div>

    <div className="progress" style={{ 'color': playerState.track.color[1] }}>
      <span className='current-time'>{playerState.currentTime || '00:00'}</span>
      <progress 
        className='progress-slider'
        value="0" max="1"
        ref={progressSlider}
        onClick={seekAudio}
        style={{ 'background': playerState.track.color[1], '--progress-value-color': playerState.track.color[1] } as CSSProperties}
      />
      <span className='duration'>{playerState.duration || '00:00'}</span>
    </div>

  </>) : <></>
}

export default Controls;
