<script setup>
const props = defineProps({
  condition: { 
    type: String, 
    default: ""
  },
  options: {
    type: Array,
    default: () => [],
  },
});
const emit = defineEmits(["condition"]);

const changeOption = (e) => {
  emit("update:condition", e.target.value);
};
</script>

<template>
  <select @change="changeOption" class="select">
    <option disabled>Выберите опцию...</option>
    <option v-for="option in options" :value="option.value" class="select__option">
      {{ option.name }}
    </option>
  </select>
</template>

<style lang="scss" scoped>
.select {
  padding: 0.5em 1.1em;
  font-size: 1.05rem;
  width: 300px;

  &__option {
    padding: 1.2rem;
    background: #fff;
  }
}
</style>
