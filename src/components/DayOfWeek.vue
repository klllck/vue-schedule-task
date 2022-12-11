<script setup>
import Card from "./Card.vue";
import { ref } from "vue";
import { useScheduleStore } from "../store/scheduleStore";
import { useCardStore } from "../store/cardStore";
import { useModalStore } from "../store/modalStore";
import { useAdminStore } from "../store/adminStore";

const scheduleStore = useScheduleStore();
const cardStore = useCardStore();
const adminStore = useAdminStore();
const modalStore = useModalStore();
const dayNames = ref(["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"]);

const editScheduleForThisDay = () => {
  if (!adminStore.isAuth) {
    return;
  }
  scheduleStore.currentDay = props.day;
  modalStore.showModal();
};

const dragStart = (e, day, card) => {
  scheduleStore.selectDay(day);
  cardStore.selectCard(card);
};

const dragOver = (e) => {};

const swapCard = (e, targetCard) => {
  let temp = { ...targetCard };
  targetCard.clientName = cardStore.selectedCard.clientName;
  targetCard.reasonDesc = cardStore.selectedCard.reasonDesc;
  cardStore.selectedCard.clientName = temp.clientName;
  cardStore.selectedCard.reasonDesc = temp.reasonDesc;
};

const check = () => {
  const l = 4
}

const props = defineProps({
  day: {
    type: Object,
    required: true,
    default: null,
  },
});
</script>

<template>
  {{ check() }}
  <h2 v-if="!cardStore.sortedCards(day)">Ничего не найдено</h2>
  <div v-else class="day">
    <div
      class="day-time"
      @click="editScheduleForThisDay"
      :class="{ today: day.date === scheduleStore.today }"
      :style="[adminStore.isAuth ? 'cursor: pointer' : '']"
    >
      <div>{{ dayNames[new Date(day.date).getDay()] }}</div>
      <div>{{ day.date }}</div>
    </div>
    <div class="day-wrapper">
      <Card
        v-for="card in cardStore.sortedCards(day)"
        :key="card.id"
        :card="card"
        draggable="true"
        @dragstart="dragStart($event, day, card)"
        @drop.stop="swapCard($event, card)"
        @dragover.prevent="dragOver($event)"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.day {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 320px;
  min-height: 120px;
  gap: 20px;

  &-time {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 80px;
    box-shadow: rgba(0, 0, 0, 0.26) 0px 3px 0px;
  }

  &-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    padding: 0.4rem;
  }
}

.today {
  background-color: #e6f4ff;
  color: #1677ff;
}
</style>
