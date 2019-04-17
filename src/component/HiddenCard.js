import React from 'react';

const DECK_UNICODE = '\u{1F0A0}';

function HiddenCard(props) {
  return (
    <div id={props.id} className={'card hidden'} draggable={false} onClick={props.clickEvent}>
      {DECK_UNICODE}
    </div>
  );
}

export default HiddenCard;
