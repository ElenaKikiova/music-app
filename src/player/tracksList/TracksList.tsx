
import React from 'react';
import { TracksListOptions } from '../models/PlayerModels';
import './TracksList.scss';

const TracksList = ({list}: TracksListOptions) => {
  console.log(list)
  return (
    <div className="TracksList">
      { list.map((e) => (
        <div key={e}>{e}</div>
      )) }
    </div>
  );
}

export default TracksList;
