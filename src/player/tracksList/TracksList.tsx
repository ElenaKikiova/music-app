
import React from 'react';
import { TracksListOptions } from '../models/PlayerModels';
import './TracksList.scss';

const TracksList = ({list}: TracksListOptions) => {
  console.log(list)
  return (
    <div className='TracksList'>
      <h2>Tracks</h2>
      <div className="tracks">
        { list.map((e) => (
          <div className='track' key={e}>{e}</div>
        )) }
      </div>
    </div>
  );
}

export default TracksList;
