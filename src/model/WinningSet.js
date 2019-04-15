import { FIRST_CARD_NUMBER } from './utils';

class WinningSet {
  constructor() {
    let dummyCard = { type: '', number: '', unicode: '', color: '' };
    this.cards = {
      spade: [dummyCard],
      heart: [dummyCard],
      club: [dummyCard],
      diamond: [dummyCard]
    };
  }

  addCards(cards) {
    let card = cards[0];
    const cardSet = this.cards[card.type];
    if (this.isValid(card)) {
      card.makeDraggable();
      cardSet.unshift(card);
      return true;
    }
    return false;
  }

  isValid(card) {
    const topCard = this.cards[card.type][0];
    if (!topCard && +card.number !== FIRST_CARD_NUMBER) return false;
    if (topCard && !card.isNext(topCard)) return false;
    return true;
  }

  removeCard() {
    const card = this.cards.shift();
    const topCard = this.getTopCard();
    topCard.makeDraggable();
    return card;
  }

  isWon() {
    let cardsDrawn = 0;
    Object.keys(this.cards).forEach(suit=> {
      cardsDrawn += this.cards[suit].length;
    })
    return cardsDrawn === 52;
  }
}

export default WinningSet;
