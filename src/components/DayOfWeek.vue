<script setup>
import Card from "./Card.vue";
import { useScheduleStore } from "../store/scheduleStore";
import { useCardStore } from "../store/cardStore";
import { useAdminStore } from "../store/adminStore";
import { ref } from "vue";

const scheduleStore = useScheduleStore();
const cardStore = useCardStore();
const adminStore = useAdminStore();
const dayNames = ref(["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"]);

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

const removeDay = () => {
  if (window.confirm("Вы точно хотите удалить расписание на этот день?")) {
    scheduleStore.deleteDay(props.day);
  }
};

const props = defineProps({
  day: {
    type: Object,
    required: true,
    default: null,
  },
});
</script>

<template>
  <h2 v-if="cardStore.getSortedCards(day).length === 0">Ничего не найдено</h2>
  <div v-else class="day">
    <div
      class="day-time"
      :class="{ today: day.date === scheduleStore.today }"
    >
      <div v-if="adminStore.isAuth" @click="removeDay" class="day-time__remove">x</div>
      <div>{{ dayNames[new Date(day.date).getDay()] }}</div>
      <div>{{ day.date.split("-").reverse().join("-") }}</div>
    </div>
    <div class="day-wrapper">
      <Card
        v-for="card in cardStore.getSortedCards(day)"
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
    position: relative;
    background-color: #f0f0f0;

    &__remove {
      position: absolute;
      top: 0;
      right: 0;
      background: rgba(238, 33, 74, 0.85);
      color: #fff;
      width: 30px;
      height: 30px;
      font-size: 1.4rem;
      display: flex;
      justify-content: center;
      border-radius: 4px;
      margin: 0.5rem;
      cursor: pointer;
    }
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
  background-color: #daefff;
  color: #1677ff;
}
</style>
