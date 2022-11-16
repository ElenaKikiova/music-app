
import React from 'react';
import { TracksListOptions } from '../models/PlayerModels';
import './TracksList.scss';

const TracksList = ({list, onChangeTrack}: TracksListOptions) => {

  return (
    <div className='TracksList'>
      <h2>Tracks</h2>
      <div className="tracks">
        { list.map((e, i) => (
          <div className='track' key={e.audio} onClick={() => onChangeTrack(i)}>{e.name}</div>
        )) }
      </div>
    </div>
  );
}

export default TracksList;
