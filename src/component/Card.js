import React from 'react';

function Card(props) {
  const draggable = props.draggable === undefined;
  return (
    <div
      id={props.id}
      className={props.classes + ' card'}
      draggable={draggable}
      onDragStart={props.dragStart}
      onDragOver={props.dragOverEvent}
      onDrop={props.dropEvent}
      onClick={props.clickEvent}
      style={props.style}
    >
      {props.unicode}
    </div>
  );
}

export default Card;
