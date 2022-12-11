import { defineStore } from "pinia";
import { ref } from "vue";

export const useAdminStore = defineStore("adminStore", () => {
  const isAuth = ref(false);

  const login = (password) => {
    if (password === "asd") {
      isAuth.value = true;
    }
  };

  const logout = () => {
    if (isAuth) isAuth.value = false;
  };

  return {
    isAuth,
    login,
    logout,
  };
});
