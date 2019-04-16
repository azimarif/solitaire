import React from 'react';

import Card from './Card';

class WinningSetView extends React.Component {
  render() {
    return this.createWinningSets();
  }

  createWinningSets() {
    const suits = Object.keys(this.props.suits);
    const view = suits.map(suit => {
      let lastCard = this.props.suits[suit][0];
      let { unicode, color } = lastCard;
      return (
        <Card
          id={suit}
          key={suit}
          classes='box'
          unicode={unicode}
          dropEvent={this.props.dropEvent}
          dragOverEvent={this.props.dragOverEvent}
          dragStart={this.props.dragStart}
          style={{ color }}
        />
      );
    });
    return (
      <div id='cardSet' style={{ display: 'flex', marginLeft: '200px' }}>
        {view}
      </div>
    );
  }
}

export default WinningSetView;
