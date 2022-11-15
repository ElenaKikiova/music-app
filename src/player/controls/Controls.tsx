
import React from 'react';
import { ControlsOptions } from '../models/PlayerModels';
import './Controls.scss';

const Controls = (options: ControlsOptions) => {
  console.log(options)
  return options.show ? (
    <div className="Controls">
      { options.show }aaaaaaaaa
    </div>) : <></>;
}

export default Controls;
