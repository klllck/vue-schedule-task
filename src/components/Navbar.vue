<script setup>
import { ref } from "vue";
import { useModalStore } from "../store/modalStore";
import { useAdminStore } from "../store/adminStore";

const adminStore = useAdminStore();
const modalStore = useModalStore();

const password = ref("");

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

    &__password {
      padding: 0.5em 1.1em;
      font-size: 1.05rem;
      width: 60%;
    }
  }

  &__title {
    color: #fff;
    font-size: 1.6rem;
    font-weight: 500;
  }
}
</style>
