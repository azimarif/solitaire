import React from 'react';
import Card from './Card'

const DECK_UNICODE = '\u{1F0A0}';

class PileView extends React.Component {
  render() {
    return this.createPiles();
  }

  createPiles() {
    let element =[]
    for (let i = 1; i <= 7; i++) {
      let pile = this.props.piles[i];
      element.push(this.renderPile(pile, i));
    }
    return element;
  }

  renderPile(pile, pileId) {
    const child = [];
    pile.cards.forEach(card => child.push(this.createPileCard(card)));
    if (child.length > 0) {
      return (
        <div key={'pile' + pileId} id={'pile_' + pileId} className='pile'>
          {child}
        </div>
      );
    }
    return (
      <div key={'pile' + pileId} id={'pile_' + pileId} className='pile'>
        <Card
          id={'blankCard'}
          key={'blankCard'}
          classes={'card'}
          draggable={false}
          unicode={''}
          dropEvent={this.props.dropEvent}
          dragOverEvent={this.props.dragOverEvent}
          style={{ background: 'transparent' }}
        />
      </div>
    );
  }

  createPileCard(card) {
    const id = [card.type, card.color, card.number].join('_');
    let unicode = DECK_UNICODE;
    let classes = 'card hidden';
    let style = {};
    if (card.draggable) {
      unicode = card.unicode;
      classes = 'card';
      style = { color: card.color };
    }
    return (
      <Card
        id={id}
        key={id}
        classes={classes}
        unicode={unicode}
        dropEvent={this.props.dropEvent}
        dragOverEvent={this.props.dragOverEvent}
        dragStart={this.props.dragStart}
        style={style}
      />
    );
  }

}

export default PileView;