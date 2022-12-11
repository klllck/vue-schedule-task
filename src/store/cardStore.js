import { defineStore } from "pinia";
import { ref, watch } from "vue";

export const useCardStore = defineStore("cardStore", () => {
  const cards = ref([]);
  const selectedCard = ref(null);

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

  const addCard = (card) => {
    const cardId = new Date().getGuid();
    cards.value.push({ id: cardId, ...card });
  };

  const deleteCard = (id) => {
    cards.value = cards.value.filter((card) => card.id !== id);
  };

  const selectCard = (card) => {
    selectedCard.value = card;
  };

  const sortedCards = () => {
    return cards.value.sort((a, b) => {
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
    sortedCards,
    addCard,
    deleteCard,
  };
});
