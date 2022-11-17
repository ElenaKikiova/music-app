
import React from 'react';
import { TracksListOptions } from '../models';
import './TracksList.scss';

const TracksList = ({list, currentId, onChangeTrack}: TracksListOptions) => {

  return (
    <div className='TracksList'>
      <h2>Tracks</h2>
      <div className="tracks">
        { list.map((e) => (
          <div 
            className={'track' + (e.id === currentId ? ' active' : '')} 
            key={e.audio} 
            onClick={() => onChangeTrack(e.id)}>
            {e.name}
          </div>
        )) }
      </div>
    </div>
  );
}

export default TracksList;
