
import React from 'react';
import { TracksListOptions } from '../models/PlayerModels';
import './TracksList.scss';

const TracksList = ({list, onChangeTrack}: TracksListOptions) => {

  return (
    <div className='TracksList'>
      <h2>Tracks</h2>
      <div className="tracks">
        { list.map((e, i) => (
          <div className='track' key={e.url} onClick={() => onChangeTrack(i)}>{e.title}</div>
        )) }
      </div>
    </div>
  );
}

export default TracksList;
