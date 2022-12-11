import { defineStore } from "pinia";
import { ref, watch } from "vue";

export const useCardStore = defineStore("cardStore", () => {
  const cards = ref([]);
  const selectedCard = ref(null);
  const cardsFilterCondition = ref("all");

  const cardsInLocalStorage = localStorage.getItem("cards");
  if (cardsInLocalStorage) {
    cards.value = JSON.parse(cardsInLocalStorage)._value;
  }

  watch(
    () => cards,
    (state) => {
      localStorage.setItem("cards", JSON.stringify(state));
    },
    { deep: true }
  );

  const getCardById = (cardId) => {
    return cards.value.find((card) => card.id === cardId);
  };

  const addCard = (card) => {
    cards.value.push(card);
  };

  const deleteCard = (id) => {
    cards.value = cards.value.filter((card) => card.id !== id);
  };

  const selectCard = (card) => {
    selectedCard.value = card;
  };

  const setFilterCondition = (condition) => {
    cardsFilterCondition.value = condition;
  };

  const sortedCards = (day) => {
    const filteredCards = day.cards.filter((card) => {
      switch (cardsFilterCondition.value) {
        case "all":
          return card;
        case "filled":
          return card.clientName !== "";
        case "empty":
          return card.clientName === "";
        default:
          break;
      }
    });

    return filteredCards.sort((a, b) => {
      if (a.timeStampFrom.split(":")[0] < b.timeStampTo.split(":")[0])
        return -1;
      if (a.timeStampFrom.split(":")[0] > b.timeStampTo.split(":")[0]) return 1;

      if (a.timeStampFrom.split(":")[1] < b.timeStampTo.split(":")[1])
        return -1;
      if (a.timeStampFrom.split(":")[1] > b.timeStampTo.split(":")[1]) return 1;

      return 0;
    });
  };

  return {
    cards,
    selectCard,
    selectedCard,
    addCard,
    deleteCard,
    getCardById,
    sortedCards,
    setFilterCondition,
  };
});
