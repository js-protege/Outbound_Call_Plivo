import React, { useState } from 'react';

import './Button.css';

export const Button = (props) => {
  return (
      <button className={'btn ' + (props.class || 'btn-primary')} type={props.type || 'button'} onClick={props.action}>{props.text}</button>
  );
};
