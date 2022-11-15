
import React from 'react';
import { VideoOptions } from '../models/PlayerModels';
import './Video.scss';

const Video = ({url}: VideoOptions) => {
  console.log(url)
  return (
    <div className="Video">
      <video>
        <source src={url} type="video/mp4" />
        <source src={url} type="video/ogg" />
      </video>
    </div>
  );
}

export default Video;
