const FIRST_ELEMENT = 0;
const FIRST_CARD_NUMBER = 1;
const TOTAL_PILES_COUNT = 7;

const isEmpty = list => {
  if (!list) return true;
  return list.length === 0;
};

export { FIRST_ELEMENT, FIRST_CARD_NUMBER, TOTAL_PILES_COUNT, isEmpty };
