import React from 'react';

import  Card from './card'
const DECK_UNICODE = '\u{1F0A0}';

class WastePileView extends React.Component {
  render() {
    return (
    <div id="deck" className="waste-pile">
      <Card unicode={DECK_UNICODE} classes={'card hidden'} clickEvent={this.props.clickEvent} />
        {this.renderNewCard()}
    </div>)
  }


  renderNewCard() {
    const latestCard = this.props.card;
    if(latestCard) {
    return (
      <Card
        unicode={latestCard.unicode}
        style={{ color: latestCard.color }}
        clickEvent={this.props.clickEvent}
        dragStart={this.props.dragStart}
      />
    );
    }
    return (
      <Card
        unicode={''}
        style={{ background:'transparent'}}
      />
    );
  }
}

export default WastePileView;