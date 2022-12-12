<script setup>
import { ref } from "vue";
import { useScheduleStore } from "../store/scheduleStore";
import { useCardStore } from "../store/cardStore";
import { useAdminStore } from "../store/adminStore";

const adminStore = useAdminStore();
const scheduleStore = useScheduleStore();
const cardStore = useCardStore();

const choosenDay = ref(scheduleStore.today);
const errorMessage = ref("");

const cardData = ref({
  timeStampFrom: "",
  timeStampTo: "",
  dayOfWeek: "",
  clientName: "",
  reasonDesc: "",
});

const addNewCard = () => {
  inputDataValidation(cardData.value);
  if (errorMessage.value !== "") return;
  cardData.value.dayOfWeek = choosenDay.value;

  let currentDay = null;
  const dayId = new Date().getGuid();
  if (!scheduleStore.days.map((a) => a.date).includes(choosenDay.value)) {
    scheduleStore.addNewDay(dayId, choosenDay.value);
    currentDay = scheduleStore.getDayById(dayId);
  } else {
    currentDay = scheduleStore.days.find((day) => day.date === choosenDay.value);
  }

  if (currentDay) {
    const cardId = new Date().getGuid();
    cardStore.addCard({ id: cardId, ...cardData.value });
    const currentCard = cardStore.getCardById(cardId);

    scheduleStore.addCardToDay(currentDay, currentCard);
  }

  hideModal();
};

const removeCard = () => {
  if (window.confirm("Вы точно хотите удалить этот слот?")) {
    const cardId = cardStore.selectedCard.id;
    scheduleStore.deleteCardFromDay(cardId);
    cardStore.deleteCard(cardId);
  }
  hideModal();
};

const hideModal = () => {
  cardData.value.timeStampFrom = "";
  cardData.value.timeStampTo = "";
  cardData.value.clientName = "";
  cardData.value.reasonDesc = "";
  cardStore.selectedCard = null;
  errorMessage.value = "";
  emit("update:isOpen", false);
};

const editCard = () => {
  inputDataValidation(cardStore.selectedCard)
  if (errorMessage.value !== "") return;

  hideModal();
}

const inputDataValidation = (data) => {
  if (
    data.timeStampFrom.split(":")[0] * 60 +
    data.timeStampFrom.split(":")[1] * 1 >=
    data.timeStampTo.split(":")[0] * 60 +
    data.timeStampTo.split(":")[1] * 1
  ) {
    errorMessage.value = "Укажите правильное время!";
    return;
  }
  if (
    (data.clientName === "" && data.reasonDesc === "") ||
    (data.clientName !== "" && data.reasonDesc !== "")
  ) {
    errorMessage.value = "";
  } else {
    errorMessage.value = "Все поля должны быть заполнены, либо пустые";
  }
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
  <div v-if="isOpen" class="modal">
    <div class="modal__error" v-if="errorMessage !== ''">{{ errorMessage }}</div>
    <form v-if="cardStore.selectedCard" @submit.prevent="editCard">
      <div @click.stop class="modal-body">
        <div class="modal-body-top">
          <div class="modal-body-top-time">
            <input
              v-model="cardStore.selectedCard.timeStampFrom"
              type="time"
              class="modal-input__time"
              required
            />
            <div>-</div>
            <input
              v-model="cardStore.selectedCard.timeStampTo"
              type="time"
              class="modal-input__time"
              required
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
          <textarea
            v-model="cardStore.selectedCard.reasonDesc"
            type="text"
            class="modal-input__text"
          />
        </div>
        <div class="modal-body-bottom">
          <button type="submit">Подтвердить</button>
          <button @click="removeCard" v-if="adminStore.isAuth" class="btn-delete">
            Удалить
          </button>
          <button type="submit">Отмена</button>
        </div>
      </div>
    </form>

    <form v-else @submit.prevent="addNewCard">
      <div @click.stop class="modal-body">
        <div class="modal-body-top">
          <input
            type="date"
            class="modal-input__date"
            v-model="choosenDay"
            :min="scheduleStore.today"
            required
          />
          <div class="modal-body-top-time">
            <input
              v-model="cardData.timeStampFrom"
              type="time"
              class="modal-input__time"
              required
            />
            <div>-</div>
            <input
              v-model="cardData.timeStampTo"
              type="time"
              class="modal-input__time"
              required
            />
          </div>
        </div>
        <div class="modal-body-middle">
          <label>Клиент ФИО</label>
          <input v-model="cardData.clientName" type="text" class="modal-input__text" />
          <label>Причина обращения</label>
          <textarea v-model="cardData.reasonDesc" type="text" class="modal-input__text" />
        </div>
        <div class="modal-body-bottom">
          <button type="submit">Создать</button>
          <button @click="hideModal">Отмена</button>
        </div>
      </div>
    </form>
  </div>
</template>

<style lang="scss" scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(189, 189, 189, 0.8);
  backdrop-filter: blur(2px);
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  &__error {
    font-size: 1.2rem;
    text-align: center;
    font-weight: 600;
    background-color: #fff;
    color: crimson;
    padding: 1.4rem;
    width: 490px;
    border-top-left-radius: 14px;
    border-top-right-radius: 14px;
  }

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
        align-items: center;
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
      font-size: 1rem;
    }

    &__text {
      padding: 0.3rem;
      font-size: 1rem;
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
