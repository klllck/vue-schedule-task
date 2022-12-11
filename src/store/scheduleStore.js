import { defineStore } from "pinia";
import { ref, computed, watch } from "vue";
import { useCardStore } from "./cardStore";

export const useScheduleStore = defineStore("scheduleStore", () => {
  const today = ref(new Date().toDateInputValue());
  const days = ref([]);
  const currentDay = ref("");

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

  const getDayById = (dayId) => {
    return days.value.find((day) => day.id === dayId);
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

  const selectDay = (day) => {
    currentDay.value = day;
  };

  const sortedDays = computed(() => {
    return days.value.sort((a, b) => new Date(a.date) - new Date(b.date));
  });

  return {
    today,
    days,
    currentDay,
    selectDay,
    sortedDays,
    addNewDay,
    addCardToDay,
    getDayById,
  };
});
