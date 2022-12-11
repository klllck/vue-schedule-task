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

  const addNewDay = (choosenDay) => {
    if (!days.value.includes(choosenDay)) {
      days.value.push(choosenDay);
    }
  };

  const sortedDays = computed(() => {
    return days.value.sort((a, b) => new Date(a) - new Date(b));
  });

  const scheduleByDay = (currentDay) => {
    const cardStore = useCardStore();
    return cardStore
      .sortedCards()
      .filter((card) => card.dayOfWeek === currentDay);
  };

  return {
    today,
    days,
    currentDay,
    sortedDays,
    addNewDay,
    scheduleByDay,
  };
});
