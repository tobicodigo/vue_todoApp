<template>
  <div class="color-options">
    <label v-for="(color, index) in store.state.colors" :key="index">
      <input
        type="radio"
        name="color"
        :value="index"
        :checked="isChecked(index)"
        @change="handleChange(index)"
      />

      <span
        class="color"
        :style="{ backgroundColor: 'var(' + color + ')' }"
      ></span>
    </label>
  </div>
</template>

<script setup>
import { useStore } from "vuex";
import { ref, defineProps, defineEmits } from "vue";
const store = useStore();

const props = defineProps({
  modelValue: Number,
});
const emit = defineEmits(['update:modelValue']);

const selectedOption = ref(props.modelValue);

const isChecked = (value) => {
  //  alert(value + " "+selectedOption.value + " " + (value === selectedOption.value) )
  return value === selectedOption.value;
};

const handleChange = (value) => {
  selectedOption.value = value;
  emit('update:modelValue', selectedOption.value);
};
</script>

<style scoped>
.color-options {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.color {
  display: inline-block;
  width: 40px;
  height: 40px;
  margin-right: 10px;
  border: 1px solid #ccc;
  cursor: pointer;
  transition-duration: 0.4s;

}

.color:hover {
  border: 3px solid white;

}

.red {
  background-color: red;
}

.green {
  background-color: green;
}

.blue {
  background-color: blue;
}

.yellow {
  background-color: yellow;
}

input[type="radio"] {
  display: none;
}

input[type="radio"]:checked + .color {
  border: 2px solid black;
}
</style>
