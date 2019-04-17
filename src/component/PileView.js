import React from 'react';
import Card from './Card';
import BlankCard from './BlankCard';
import HiddenCard from './HiddenCard';

class PileView extends React.Component {
  render() {
    return this.createPiles();
  }

  createPiles() {
    let element = [];
    for (let i = 1; i <= 7; i++) {
      let pile = this.props.piles[i];
      element.push(this.renderPile(pile, i));
    }
    return element;
  }

  renderPile(pile, pileId) {
    const cards = pile.cards.map(card => this.createPileCard(card));
    if (cards.length > 0) {
      return (
        <div key={'pile' + pileId} id={'pile_' + pileId} className='pile'>
          {cards}
        </div>
      );
    }
    return (
      <div key={'pile' + pileId} id={'pile_' + pileId} className='pile'>
        <BlankCard
          id={'blankCard'}
          key={'blankCard'}
          dropEvent={this.props.dropEvent}
          dragOverEvent={this.props.dragOverEvent}
        />
      </div>
    );
  }

  createPileCard(card) {
    const id = [card.type, card.color, card.number].join('_');
    if (card.draggable) {
      return (
        <Card
          id={id}
          key={id}
          unicode={card.unicode}
          dropEvent={this.props.dropEvent}
          dragOverEvent={this.props.dragOverEvent}
          dragStart={this.props.dragStart}
          style={{ color: card.color }}
        />
      );
    }
    return <HiddenCard />;
  }
}

export default PileView;
