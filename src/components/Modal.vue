<script setup>
import { useScheduleStore } from "../store/scheduleStore";
import { useCardStore } from "../store/cardStore";
import { ref } from "vue";

const scheduleStore = useScheduleStore();
const cardStore = useCardStore();
const choosenDay = ref(scheduleStore.today);

const cardData = ref({
  dayOfWeek: "",
  timeStampFrom: "",
  timeStampTo: "",
  clientName: "",
  reasonDesc: "",
});

const addNewCard = () => {
  if (
    cardData.value.timeStampFrom.split(":")[0] * 60 +
      cardData.value.timeStampFrom.split(":")[1] * 1 >=
    cardData.value.timeStampTo.split(":")[0] * 60 +
      cardData.value.timeStampTo.split(":")[1] * 1
  ) {
    console.log("Time input error");
    return;
  }

  cardData.value.dayOfWeek = choosenDay.value;
  scheduleStore.addNewDay(choosenDay.value);

  cardStore.addCard(cardData.value);
  hideModal();
};

const removeCard = () => {
  cardStore.deleteCard(cardStore.selectedCard.id);
  hideModal();
};

const hideModal = () => {
  cardData.value.timeStampFrom = "";
  cardData.value.timeStampTo = "";
  cardData.value.clientName = "";
  cardData.value.reasonDesc = "";
  cardStore.selectedCard = null;
  emit("update:isOpen", false);
};

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true,
    default: false,
  },
});
const emit = defineEmits(["isOpen"]);
</script>

<template>
  <form v-if="isOpen" @submit.prevent class="modal">
    <div v-if="cardStore.selectedCard" @click.stop class="modal-body">
      <div class="modal-body-top">
        <input
          type="date"
          class="modal-input__date"
          v-model="cardStore.selectedCard.dayOfWeek"
          :min="scheduleStore.today"
        />
        <div class="modal-body-top-time">
          <input
            v-model="cardStore.selectedCard.timeStampFrom"
            type="time"
            class="modal-input__time"
          />
          <div>-</div>
          <input
            v-model="cardStore.selectedCard.timeStampTo"
            type="time"
            class="modal-input__time"
          />
        </div>
      </div>
      <div class="modal-body-middle">
        <label>Клиент ФИО</label>
        <input
          v-model="cardStore.selectedCard.clientName"
          type="text"
          class="modal-input__text"
        />
        <label>Причина обращения</label>
        <input
          v-model="cardStore.selectedCard.reasonDesc"
          type="text"
          class="modal-input__text"
        />
      </div>
      <div class="modal-body-bottom">
        <button @click="hideModal">Обновать</button>
        <button @click="removeCard" class="btn-delete">Удалить</button>
        <button @click="hideModal">Отмена</button>
      </div>
    </div>

    <div v-else @click.stop class="modal-body">
      <div class="modal-body-top">
        <input
          type="date"
          class="modal-input__date"
          v-model="choosenDay"
          :min="scheduleStore.today"
        />
        <div class="modal-body-top-time">
          <input v-model="cardData.timeStampFrom" type="time" class="modal-input__time" />
          <div>-</div>
          <input v-model="cardData.timeStampTo" type="time" class="modal-input__time" />
        </div>
      </div>
      <div class="modal-body-middle">
        <label>Клиент ФИО</label>
        <input v-model="cardData.clientName" type="text" class="modal-input__text" />
        <label>Причина обращения</label>
        <input v-model="cardData.reasonDesc" type="text" class="modal-input__text" />
      </div>
      <div class="modal-body-bottom">
        <button @click="addNewCard">Создать</button>
        <button @click="hideModal">Отмена</button>
      </div>
    </div>
  </form>
</template>

<style lang="scss" scoped>
.modal {
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(174, 174, 174, 0.6);
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;

  &-body {
    display: flex;
    flex-direction: column;
    width: 500px;
    gap: 10px;
    padding: 1.1rem;
    background: #fff;
    border-radius: 8px;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 6px 12px 4px;

    &-top {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 10px;
      padding: 0.4rem;

      &-time {
        display: flex;
        justify-content: center;
        width: 100%;
        gap: 5px;
      }
    }

    &-middle {
      display: flex;
      flex-direction: column;
      gap: 10px;
      justify-content: center;
    }

    &-bottom {
      display: flex;
      justify-content: space-between;
    }
  }

  &-input {
    &__date {
      width: 150px;
      text-align: center;
      padding: 0.3rem;
      font-size: 1rem;
    }

    &__time {
      padding: 0.3rem;
      width: 100px;
    }

    &__text {
      padding: 0.3rem;
    }
  }
}

.btn {
  &-delete {
    background-color: crimson;
    color: #fff;
  }
}
</style>