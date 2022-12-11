<script setup>
import DayOfWeek from "./DayOfWeek.vue";
import Modal from "./Modal.vue";
import { useScheduleStore } from "../store/scheduleStore";
import { useModalStore } from "../store/modalStore";
import { ref } from "vue";

const scheduleStore = useScheduleStore();
const modalStore = useModalStore();
</script>

<template>
  <div class="schedule">
    <div class="schedule__info" v-if="scheduleStore.days.length === 0">
      На данный момент ничего не запланированно
    </div>
    <DayOfWeek v-for="day in scheduleStore.sortedDays" :key="day.id" :day="day" />
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
