<script setup>
import DayOfWeek from "./DayOfWeek.vue";
import Modal from "./Modal.vue";
import { useScheduleStore } from "../store/scheduleStore";
import { useModalStore } from "../store/modalStore";

const scheduleStore = useScheduleStore();
const modalStore = useModalStore();
</script>

<template>
  <div class="schedule">
    <div class="schedule__info" v-if="scheduleStore.days.length === 0">
      В данный момент расписание пустое
    </div>
    <h2 v-else-if="scheduleStore.sortedDays.length === 0">Ничего не найдено</h2>
    <DayOfWeek v-else v-for="day in scheduleStore.sortedDays" :key="day.id" :day="day" />
    <Modal v-model:isOpen="modalStore.modalVisible" />
  </div>
</template>

<style lang="scss" scoped>
.schedule {
  display: flex;
  min-height: calc(100vh - 70px);
  padding: 0.4rem 1.6rem;
  overflow: scroll;

  &__info {
    text-align: center;
    font-size: 2rem;
    font-weight: 600;
    margin-top: 20px;
  }
}
</style>
