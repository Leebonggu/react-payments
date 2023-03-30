import React from 'react';
import Input from './Input';

function ValidatorInput() {
  return (
    <div>
      <label></label>
      <Input />
      {false && <span></span>}
    </div>
  );
}

export default ValidatorInput;
