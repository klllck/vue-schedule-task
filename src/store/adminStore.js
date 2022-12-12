import { defineStore } from "pinia";
import { ref } from "vue";

export const useAdminStore = defineStore("adminStore", () => {
  const isAuth = ref(false);

  /// Заглушка для обхода аутентификации с бэкенда
  const login = (password) => {
    if (password === "admin") {
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
