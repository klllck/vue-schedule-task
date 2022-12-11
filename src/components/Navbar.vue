<script setup>
import CustomSelect from "../components/UI/CustomSelect.vue";
import { ref, watch } from "vue";
import { useModalStore } from "../store/modalStore";
import { useAdminStore } from "../store/adminStore";
import { useScheduleStore } from "../store/scheduleStore";
import { useCardStore } from "../store/cardStore";

const adminStore = useAdminStore();
const modalStore = useModalStore();
const scheduleStore = useScheduleStore();
const cardStore = useCardStore();

const password = ref("");
const daysFilterCondition = ref("");
const cardsFilterCondition = ref("");

const dayFilters = ref([
  { value: "all", name: "Все дни" },
  { value: "filled", name: "Только занятые дни" },
  { value: "empty", name: "Только свободные дни" },
]);

const cardFilters = ref([
  { value: "all", name: "Все слоты" },
  { value: "filled", name: "Только занятые слоты" },
  { value: "empty", name: "Только свободные слоты" },
]);

watch(
  () => cardsFilterCondition,
  (state) => {
    cardStore.setFilterCondition(state.value);
  },
  { deep: true }
);

watch(
  () => daysFilterCondition,
  (state) => {
    scheduleStore.setFilterCondition(state.value);
  },
  { deep: true }
);

const logout = () => {
  adminStore.logout();
  password.value = "";
};
</script>

<template>
  <header class="navbar">
    <a href="/">
      <p class="navbar__title">Schedule Task</p>
    </a>
    <div class="navbar-filters">
      <CustomSelect :options="cardFilters" v-model:condition="cardsFilterCondition" />
      <CustomSelect :options="dayFilters" v-model:condition="daysFilterCondition" />
    </div>
    <div class="navbar-pannel">
      <div v-if="adminStore.isAuth" class="navbar-pannel-admin">
        <button @click="modalStore.showModal">Добавить слот</button>
        <button @click="logout">Выйти</button>
      </div>
      <div v-else class="navbar-pannel-user">
        <input
          type="password"
          class="navbar-pannel-user__password"
          placeholder="Введите пароль..."
          v-model="password"
        />
        <button @click="adminStore.login(password)">Войти</button>
      </div>
    </div>
  </header>
</template>

<style lang="scss" scoped>
.navbar {
  width: 100%;
  height: 70px;
  background: rgb(83, 123, 255);
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 4rem;

  &-filters {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 40%;
    gap: 60px;
  }

  &-pannel-admin {
    display: flex;
    height: 100%;
    align-items: center;
    justify-content: space-between;
    width: 320px;
  }

  &-pannel-user {
    display: flex;
    height: 100%;
    align-items: center;
    justify-content: space-between;
    width: 300px;
  }

  input {
    padding: 0.5em 1.1em;
    font-size: 1.05rem;
    width: 60%;
  }

  &__title {
    color: #fff;
    font-size: 1.6rem;
    font-weight: 500;
  }
}
</style>
