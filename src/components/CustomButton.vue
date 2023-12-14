<template>
  <!-- Button component -->
  <button class="button"
    type="button"
    :style="{ backgroundColor: color }"
    @click="handleClick" 
  >
    <slot /> <!-- Displaying slot content inside the button -->
  </button>
</template>

<script setup>
// Importing necessary Vue composition API functions
import { defineProps } from "vue";

// Defining props for the button component
const props = defineProps({
  color: {
    type: String,
    default: "blue", // Default color value for the button
  },
  task: {
    type: Object,
    required: false,
  },
});

// Method to handle button click (currently empty)
const handleClick = () => {
  // Functionality for handling button click can be added here
};
</script>

<style scoped>
.button {
  padding: 8px 36px;
  border: none;
  border-radius: 4px;
  color: white;
  cursor: pointer;
  outline: none;
  transition-duration: 0.4s;
  font-size: 15px;

}


.button:hover {
  box-shadow: 0 0 0 2px #d0d0d0,
                inset 0 0 0 1px #fff;
              font-weight: bold;
              
}

@media screen and (max-width: 579px) {
  .button {
    padding: 8px 18px;
    font-size: 12px;
  }
}
</style>
