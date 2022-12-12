import { defineStore } from "pinia";
import { ref, computed, watch } from "vue";

export const useScheduleStore = defineStore("scheduleStore", () => {
  const today = ref(new Date().toDateInputValue());
  const days = ref([]);
  const currentDay = ref("");
  const daysFilterCondition = ref("all");

  const daysInLocalStorage = localStorage.getItem("days");
  if (daysInLocalStorage) {
    days.value = JSON.parse(daysInLocalStorage)._value;
  }

  watch(
    () => days,
    (state) => {
      localStorage.setItem("days", JSON.stringify(state));
    },
    { deep: true }
  );

  const setFilterCondition = (condition) => {
    daysFilterCondition.value = condition;
  };

  const getDayById = (dayId) => {
    return days.value.find((day) => day.id === dayId);
  };

  const getDayByDate = (date) => {
    return days.value.find((day) => day.date === date);
  };

  const addNewDay = (dayId, choosenDay) => {
    days.value.push({
      id: dayId,
      date: choosenDay,
      cards: [],
    });
  };

  const addCardToDay = (day, card) => {
    day.cards.push(card);
  };

  const deleteCardFromDay = (id) => {
    days.value.forEach((day) => {
      day.cards = day.cards.filter((card) => card.id !== id);
      if (day.cards.length === 0) {
        let dayIdx = days.value.findIndex((i) => i === day);
        days.value.splice(dayIdx, 1);
      }
    });
  };

  const selectDay = (day) => {
    currentDay.value = day;
  };

  const sortedDays = computed(() => {
    const filteredDays = days.value.filter((day) => {
      let filteredCards = day.cards.filter((card) => {
        switch (daysFilterCondition.value) {
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
      if (day.cards.length === filteredCards.length) {
        return day;
      }
    });

    return filteredDays.sort((a, b) => new Date(a.date) - new Date(b.date));
  });

  const deleteDay = (day) => {
    days.value = days.value.filter(d => d.id !== day.id)
  }

  return {
    today,
    days,
    currentDay,
    selectDay,
    sortedDays,
    addNewDay,
    addCardToDay,
    deleteDay,
    deleteCardFromDay,
    getDayById,
    getDayByDate,
    setFilterCondition
  };
});
