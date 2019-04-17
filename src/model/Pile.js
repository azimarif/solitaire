import { FIRST_ELEMENT } from './utils';

class Pile {
  constructor() {
    this.cards = [];
  }

  setCards(cards) {
    this.cards = cards;
    this.setLastCardActive();
  }

  getLastCard() {
    const numberOfCards = this.cards.length;
    return this.cards[numberOfCards - 1];
  }

  addCards(cards) {
    const firstCard = cards[FIRST_ELEMENT];
    if (this.cards.length < 1) {
      if (+firstCard.number === 13) {
        cards.forEach(card => {
          this.cards.push(card);
          card.makeDraggable();
        });
        return true;
      }
      return false;
    }
    if (this.isValid(firstCard)) {
      cards.forEach(card => {
        this.cards.push(card);
        card.makeDraggable();
      });
      return true;
    }
    return false;
  }

  isValid(card) {
    const lastCard = this.getLastCard();
    if (!lastCard) return true;
    return lastCard.color !== card.color && lastCard.isNext(card);
  }

  removeCards(cards) {
    const firstCard = cards[0];
    const cardStartIndex = this.cards.findIndex(
      card => card.number === firstCard.number && card.color === firstCard.color &&
      card.type === firstCard.type
    );
    this.cards = this.cards.slice(0, cardStartIndex);
    this.setLastCardActive();
  }

  setLastCardActive() {
    const lastCard = this.getLastCard();
    if (lastCard) {
      lastCard.makeDraggable();
    }
  }

  getCardsDrawn(selectedCard) {
    const index = this.cards.findIndex(card => card.number === selectedCard.number && card.type === selectedCard.type
      && card.color === selectedCard.color);
    return this.cards.slice(index);
  }
}

export default Pile;
