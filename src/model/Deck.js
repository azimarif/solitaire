import cards from '../cardsDetail';
import lodash from 'lodash';
import Card from './Card';

class Deck {
  constructor() {
    this.cards = [];
  }

  initializeCards() {
    cards.forEach(card => {
      this.cards.push(new Card(card));
    });
    this.cards = lodash.shuffle(this.cards);
  }

  getFirstNCards(n) {
    return this.cards.splice(0, n);
  }

  drawACard() {
    const card = this.cards.pop();
    this.cards.unshift(card);
  }

  getDrawnCard() {
    return this.cards[0];
  }

  getCardsDrawn() {
    return [this.cards[0]];
  }

  removeDrawnCard() {
    this.cards.shift();
  }

  removeCards() {
    this.cards.shift();
  }
}

export default Deck;
