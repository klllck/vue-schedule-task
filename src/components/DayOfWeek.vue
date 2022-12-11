<script setup>
import Card from "./Card.vue";
import { ref } from "vue";
import { useScheduleStore } from "../store/scheduleStore";
import { useModalStore } from "../store/modalStore";
import { useAdminStore } from "../store/adminStore";

const adminStore = useAdminStore();
const scheduleStore = useScheduleStore();
const modalStore = useModalStore();
const dayNames = ref(["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"]);

const editScheduleForThisDay = () => {
  if (!adminStore.isAuth) {
    return;
  }
  scheduleStore.currentDay = props.day;
  modalStore.showModal();
};

const props = defineProps({
  day: {
    type: String,
    required: true,
    default: "",
  },
});
</script>

<template>
  <div class="day">
    <div
      class="day-time"
      @click="editScheduleForThisDay"
      :class="{ today: day === scheduleStore.today }"
      :style="[adminStore.isAuth ? 'cursor: pointer' : '']"
    >
      <div>{{ dayNames[new Date(day).getDay()] }}</div>
      <div>{{ day }}</div>
    </div>
    <div class="day-wrapper">
      <Card
        v-for="card in scheduleStore.scheduleByDay(day)"
        :key="card.id"
        :card="card"
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
