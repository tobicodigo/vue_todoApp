<template>
  <!-- Rendering color options -->
  <div class="color-options">
    <label v-for="(color, index) in store.state.colors" :key="index">
      <!-- Radio input for each color option -->
      <input
        type="radio"
        name="color"
        :value="index"
        :checked="isChecked(index)"
        @change="handleChange(index)"
      />

      <!-- Displaying color preview -->
      <span
        class="color"
        :style="{ backgroundColor: 'var(' + color + ')' }"
      ></span>
    </label>
  </div>
</template>

<script setup>
// Importing necessary modules
import { useStore } from "vuex";
import { ref, defineProps, defineEmits } from "vue";

// Accessing the Vuex store
const store = useStore();

// Defining props and emits
const props = defineProps({
  modelValue: Number, // Model value for the selected color
});
const emit = defineEmits(["update:modelValue"]); // Emitting update event for modelValue

// Ref for the selected color option
const selectedOption = ref(props.modelValue);

// Method to check if a color option is selected
const isChecked = (value) => {
  return value === selectedOption.value; // Returning true if the value matches the selected option
};

// Method to handle color option change
const handleChange = (value) => {
  selectedOption.value = value; // Updating selectedOption ref with the new value
  emit("update:modelValue", selectedOption.value); // Emitting update event with the new selected value
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
  box-shadow: 0 8px 6px -6px black, inset 0 0 0 1px #fff;
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
