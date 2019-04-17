import React from 'react';
import Game from '../model/Game';
import WastePileView from './WastePileView';
import WinningSetView from './WinningSetView';
import PileView from './PileView';
import Card from '../model/Card';

class GameView extends React.Component {
  constructor(props) {
    super(props);
    this.state = { game: new Game() };
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

    return (
      <div>
        <div className='container'>
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

  allowDrop = event => event.preventDefault();

  drag(event) {
    const draggedElement = event.target.parentElement.id;
    const draggedCard = event.target.id.split('_');
    this.draggedCard = new Card({
      number: draggedCard[2],
      color: draggedCard[1],
      type: draggedCard[0]
    });
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

  drop(event) {
    event.preventDefault();
    const droppedElement = event.target.parentElement.id;
    let pileId = +droppedElement.split('_')[1];
    if (!pileId) {
      pileId = +event.target.id.split('_')[1];
    }
    this.droppingContainer = this.state.game['piles'][pileId];

    if (droppedElement === 'deck') {
      this.droppingContainer = this.state.game['deck'];
    }

    if (droppedElement === 'cardSet') {
      this.droppingContainer = this.state.game['winningSet'];
    }

    const cards = this.draggingContainer.getCardsDrawn(this.draggedCard);
    if (this.droppingContainer.addCards(cards)) {
      this.draggingContainer.removeCards(cards);
    }

    this.setState(this.state);
  }
}

export default GameView;
