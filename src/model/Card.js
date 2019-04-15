class Card {
  constructor({ number, type, color, unicode }) {
    this.number = number;
    this.type = type;
    this.color = color;
    this.unicode = unicode;
    this.draggable = false;
  }

  makeDraggable() {
    this.draggable = true;
  }

  isNext(card) {
    return +this.number - +card.number === 1;
  }
}

export default Card;
