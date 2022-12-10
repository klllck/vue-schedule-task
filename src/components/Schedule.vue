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
    <DayOfWeek v-for="(day, i) in scheduleStore.sortedDays" :key="i" :day="day" />
    <Modal v-model:isOpen="modalStore.modalVisible" />
  </div>
</template>

<style lang="scss" scoped>
.schedule {
  display: flex;
  min-height: 100vh;
  padding: .4rem 1.6rem; 
}

.control {
  position: absolute;
  top: 0;
  left: 0;
}
</style>
