import { createApp } from "vue";
import { createPinia } from "pinia";
import "./style.css";
import App from "./App.vue";

Date.prototype.toDateInputValue = function () {
  var local = new Date(this);
  local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
  return local.toJSON().slice(0, 10);
};

Date.prototype.getGuid = function () {
  return 'id' + (new Date()).getTime();
}

createApp(App).use(createPinia()).mount("#app");
