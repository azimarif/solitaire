import React from 'react';
import Game from '../model/Game';

import WastePileView from './WastePileView';
import WinningSetView from './WinningSetView';
import PileView from './PileView';


class GameView extends React.Component {
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

  isWon() {
    return this.state.game.winningSet.isWon();
  }

  render() {
    const won = this.isWon();
    if (won) {
      return <div className='won'>Congratulations, you won!</div>;
    }

    const upperSection = (
      <div className='upper'>
        <WastePileView
          card={this.state.game.getDrawnCardFromDeck()}
          clickEvent={this.drawCard.bind(this)}
          dragStart={this.drag.bind(this)}
        />
        <WinningSetView
          suits={this.state.game.winningSet.cards}
          dragStart={this.drag.bind(this)}
          dragOverEvent={this.allowDrop.bind(this)}
          dropEvent={this.drop.bind(this)}
        />
      </div>
    );

    return (
      <div>
        <div className='container'> {upperSection} </div>
        <div id='allPile' className='pile-section'>
          <PileView
            piles={this.state.game.piles}
            dragStart={this.drag.bind(this)}
            dragOverEvent={this.allowDrop.bind(this)}
            dropEvent={this.drop.bind(this)}
          />
        </div>
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

export default GameView;
