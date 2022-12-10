<script setup>
import { useModalStore } from "../store/modalStore";

const modalStore = useModalStore();
</script>

<template>
  <header class="navbar">
    <p class="navbar__title">Schedule Task</p>
    <div class="admin-pannel">
      <div class="control">
        <button @click="modalStore.showModal">Добавить слот</button>
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
  justify-content: space-around;
  align-items: center;

  &__title {
    color: #fff;
    font-size: 1.6rem;
    font-weight: 500;
  }
}
</style>
