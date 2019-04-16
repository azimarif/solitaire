import CARD_DETAIL from '../cardsDetail';
import Deck from './Deck';
import Pile from './Pile';
import WinningSet from './WinningSet';
import { TOTAL_PILES_COUNT } from './utils';

class Game {
  constructor() {
    this.cards = CARD_DETAIL;
    this.deck = undefined;
    this.piles = {};
    this.winningSet = new WinningSet();
  }

  setup() {
    this.deck = new Deck();
    this.deck.initializeCards();
    this.initializePileCards();
  }

  initializeWinningSet() {
    this.winningSet = {
      heart: new WinningSet('heart'),
      club: new WinningSet('club'),
      diamond: new WinningSet('diamond'),
      spade: new WinningSet('spade')
    };
  }

  initializePileCards() {
    for (let count = 1; count <= TOTAL_PILES_COUNT; count++) {
      const pileCards = this.deck.getFirstNCards(count);
      let pile = new Pile();
      pile.setCards(pileCards);
      this.piles[count] = pile;
    }
  }

  drawCard() {
    this.deck.drawACard();
  }

  getDrawnCardFromDeck() {
    return this.deck.getDrawnCard();
  }

  removeDrawnCardFromDeck() {
    this.deck.removeDrawnCard();
  }

  removeCardFromPile(pileId, cards) {
    this.piles[pileId].removeCards(cards);
  }

  removeCardFromSet(setId) {
    const currentSet = this.winningSet[setId];
    currentSet.removeCard();
  }

  addCardToPile(pileId, cards) {
    const currentPile = this.piles[pileId];
    return currentPile.addCards(cards);
  }

  getCardsDrawnFromPile(pileId, firstCardNumber) {
    return this.piles[pileId].getCardsDrawn(firstCardNumber);
  }

  addCardToWinningSet(setId, card) {
    const currentSet = this.winningSet[setId];
    return currentSet.addCard(card);
  }
}

export default Game;
