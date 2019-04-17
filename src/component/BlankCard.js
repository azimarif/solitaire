import React from 'react';

function BlankCard(props) {
  return (
    <div
      className={'card hidden'}
      draggable={false}
      onDrop={props.dropEvent}
      onDragOver={props.dragOverEvent}
      style={{ background: 'transparent' }}
    />
  );
}

export default BlankCard;
