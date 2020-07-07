export const drawCards = () => {
  return {
    type: "DRAW_CARDS",
    payload: fetch(
      "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1"
    )
      .then((response) => response.json())
      .then((result) =>
        fetch(
          `https://deckofcardsapi.com/api/deck/${result.deck_id}/draw/?count=16`
        ).then((data) => data.json())
      ),
  };
};

export const clickOnCard = (cardObject, order, type) => {
  return {
    type: type,
    payload: { cardObject, order },
  };
};
