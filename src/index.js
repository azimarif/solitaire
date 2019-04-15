import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Game from './model/Game';
import { Card } from './view';

const DECK_UNICODE = '\u{1F0A0}';

class GameComponent extends React.Component {
  constructor(props) {
    super(props);
    this.allowDrop = this.allowDrop.bind(this);
    this.drag = this.drag.bind(this);
    this.drop = this.drop.bind(this);
    this.drawCard = this.drawCard.bind(this);
    this.state = {
      game: new Game()
    };

    this.state.game.setup();
  }

  renderNewCard() {
    const latestCard = this.state.game.getDrawnCardFromDeck();
    if(latestCard) {
    return (
      <Card
        unicode={latestCard.unicode}
        style={{ color: latestCard.color }}
        clickEvent={this.drawCard}
        dragStart={this.drag}
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

  isWon() {
    return this.state.game.winningSet.isWon();
  }

  renderWinningCardSet() {
    const suits = Object.keys(this.state.game.winningSet.cards);
    const winningSet = [];
    suits.forEach(suit => {
      let lastCard = this.state.game.winningSet.cards[suit][0];
      let { unicode, color } = lastCard;

      winningSet.push(
        <Card
          id={suit}
          key={suit}
          classes='box'
          unicode={unicode}
          dropEvent={this.drop}
          dragOverEvent={this.allowDrop}
          dragStart={this.drag}
          style={{ color }}
        />
      );
    });
    return (
      <div id='cardSet' style={{ display: 'flex' }}>
        {winningSet}
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
        dropEvent={this.drop}
        dragOverEvent={this.allowDrop}
        dragStart={this.drag}
        style={style}
      />
    );
  }

  createPile(pile, pileId) {
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
          dropEvent={this.drop}
          dragOverEvent={this.allowDrop}
          style={{ background: 'transparent' }}
        />
      </div>
    );
  }

  render() {
    const won = this.isWon();
    if(won) {
      return (
        <div className='won'>Congratulations, you won!</div>
      )
    }

    const upperSection = (
      <div className='upper'>
        <Card unicode={DECK_UNICODE} classes={'card hidden'} clickEvent={this.drawCard} />
        <div id='deck' className='empty-box'>
          {this.renderNewCard()}
        </div>
        {this.renderWinningCardSet()}
      </div>
    );

    const element = [];
    for (let i = 1; i <= 7; i++) {
      let pile = this.state.game.piles[i];
      element.push(this.createPile(pile, i));
    }
    return (
      <div>
        <div className='container'> {upperSection} </div>
        <div id='allPile' className='container'>{element}</div>
      </div>
    );
  }

  drawCard() {
    this.state.game.drawCard();
    this.setState(this.state);
  }

  allowDrop = ev => ev.preventDefault();

  drag(ev) {
    const draggedElement = ev.target.parentElement.id;
    const draggedCard = ev.target.id;
    this.draggedCard = draggedCard.split('_');
    if (draggedElement === 'deck') {
      this.draggingContainer = this.state.game['deck'];
      return;
    }

    if (draggedElement === 'cardSet') {
      this.draggingContainer = this.state.game['winningSet'];
      return;
    }
    const pileId = draggedElement.split('_')[1];
    this.draggingContainer = this.state.game['piles'][pileId];
  }

  drop(ev) {
    ev.preventDefault();
    const droppedElement = ev.target.parentElement.id;
    let pileId = droppedElement.split('_')[1];
    if (!pileId) {
      pileId = +ev.target.id.split('_')[1];
    }
    this.droppingContainer = this.state.game['piles'][pileId];

    if (droppedElement === 'deck') {
      this.droppingContainer = this.state.game['deck'];
    }

    if (droppedElement === 'cardSet') {
      this.droppingContainer = this.state.game['winningSet'];
    }

    const cards = this.draggingContainer.getCardsDrawn(this.draggedCard[2]);
    if (this.droppingContainer.addCards(cards)) {
      this.draggingContainer.removeCards(cards);
    }

    this.setState(this.state);
  }
}

ReactDOM.render(<GameComponent />, document.getElementById('root'));
