const initalState = {
  playerOneTurn: true,
  player1: [],
  table: [],
  player2: [],
  selectedCards: [],
};

const isValidMove = (playerCard, selectedCards) => {
  const playerCardValue = cardToNumber(playerCard);
  const selectedCardsValue = selectedCards.reduce(
    (acc, cur) => acc + cardToNumber(cur),
    0
  );
  return (
    playerCardValue === selectedCardsValue ||
    (playerCardValue === 1 && selectedCardsValue === 11)
  );
};

const cardToNumber = (card) => {
  switch (card.value) {
    case "KING":
      return 14;
    case "QUEEN":
      return 13;
    case "JACK":
      return 12;
    case "ACE":
      return 1;

    default:
      return parseInt(card.value);
  }
};

export const reducer = (state = initalState, { type, payload }) => {
  switch (type) {
    case "DRAW_CARDS":
      return {
        ...state,
        player1: payload.cards.filter((_, i) => i < 6),
        table: payload.cards.filter((_, i) => i > 5 && i < 10),
        player2: payload.cards.filter((_, i) => i >= 10 && 15),
      };
    case "ADD_TO_SELECTED":
      if (payload.order === "board") {
        return {
          ...state,
          selectedCards: [...state.selectedCards, payload.cardObject],
        };
      }
    case "SELECT_PLAYER1_CARD":
      if (payload.order === "player1" && state.playerOneTurn) {
        const chosenP1card = payload.cardObject;

        const filteredP1Cards = state.player1.filter((x) => x !== chosenP1card);

        const filteredTableCards = state.table.filter(
          (x) => !state.selectedCards.includes(x)
        );

        if (isValidMove(chosenP1card, state.selectedCards) === true) {
          return {
            ...state,
            playerOneTurn: false,
            player1: filteredP1Cards,
            table: filteredTableCards,
            selectedCards: [],
          };
        }

        return {
          ...state,
          playerOneTurn: false,
          player1: filteredP1Cards,
          table: [...state.table, chosenP1card],
          selectedCards: [],
        };
      }
    case "SELECT_PLAYER2_CARD":
      if (payload.order === "player2" && !state.playerOneTurn) {
        const chosenP2card = payload.cardObject;

        const filteredP2Cards = state.player2.filter((x) => x !== chosenP2card);

        const filteredTableCards = state.table.filter(
          (x) => !state.selectedCards.includes(x)
        );

        if (isValidMove(chosenP2card, state.selectedCards) === true) {
          return {
            ...state,
            playerOneTurn: true,
            player2: filteredP2Cards,
            table: filteredTableCards,
            selectedCards: [],
          };
        }

        return {
          ...state,
          playerOneTurn: true,
          player2: filteredP2Cards,
          table: [...state.table, chosenP2card],
          selectedCards: [],
        };
      }

    default:
      return state;
  }
};
