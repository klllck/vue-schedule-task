import { defineStore } from "pinia";
import { ref } from "vue";

export const useModalStore = defineStore("modalStore", () => {
  const modalVisible = ref(false);
  const showModal = () => {
    modalVisible.value = true;
  };

  return {
    modalVisible,
    showModal,
  };
});
