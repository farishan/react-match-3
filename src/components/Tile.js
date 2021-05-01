import React from 'react';

const Tile = ({value, isActive, ...props}) => {
  const style = {
    width: '50px',
    height: '50px',
    border: '1px solid',
    borderColor: isActive ? 'red' : 'black'
  }

  return <>
    <div
      style={style}
      {...props}
    >
      {String(value)}
    </div>
  </>
}

export default Tile