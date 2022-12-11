<script setup>
import { useModalStore } from "../store/modalStore";
import { useCardStore } from "../store/cardStore";
import { ref } from "vue";

const modalStore = useModalStore();
const cardStore = useCardStore();

const editCard = () => {
  cardStore.selectCard(props.card);
  modalStore.showModal();
};

const props = defineProps({
  card: {
    type: Object,
    required: true,
    default: () => {},
  },
});
</script>

<template>
  <div class="card" @click="editCard">
    <div class="card-time">{{ card.timeStampFrom }} - {{ card.timeStampTo }}</div>
    <div v-if="card.clientName === '' && card.reasonDesc === ''" class="card-empty"></div>
    <div v-else class="card-body">
      <div class="card-body__name">Клиент: {{ card.clientName }}</div>
      <div class="card-body__text">Причина: {{ card.reasonDesc }}</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.card {
  padding: 1rem;
  min-width: 320px;
  min-height: 120px;
  border-radius: 8px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px 1px;
  position: relative;
  cursor: pointer;
  // background-color: pink;

  &-body {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100px;
    width: 100%;
    padding: 0.3rem;
    background-color: pink;
  }

  &-empty::before {
    content: "+";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 4rem;
    font-family: courier;
    color: #787878;
  }
}
</style>
