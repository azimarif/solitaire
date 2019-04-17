import React from 'react';
import Card from './Card';
import HiddenCard from './HiddenCard';
import BlankCard from './BlankCard';

class WastePileView extends React.Component {
  render() {
    return (
      <div id='deck' className='waste-pile'>
        <HiddenCard clickEvent={this.props.clickEvent} />
        {this.renderNewCard()}
      </div>
    );
  }

  renderNewCard() {
    const latestCard = this.props.card;
    if (latestCard) {
      return (
        <Card
          unicode={latestCard.unicode}
          style={{ color: latestCard.color }}
          clickEvent={this.props.clickEvent}
          dragStart={this.props.dragStart}
        />
      );
    }
    return <BlankCard />;
  }
}

export default WastePileView;
