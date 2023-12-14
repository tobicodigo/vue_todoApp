<template>
  <!-- Button Component Template -->
  <button class="button"
    type="button"
    :style="{ backgroundColor: color }"
    @click="handleClick"
  >
    <!-- Inserting content from parent component -->
    <slot />
  </button>
</template>

<script setup>
// Handling props and methods

// Defining props for the button component
const props = defineProps({
  // Setting default color for the button
  color: {
    type: String,
    default: "blue",
  },
  // Accepting task object as a prop
  task: {
    type: Object,
    required: false,
  },
});

// Placeholder function for handling button click
const handleClick = () => {
  // Add functionality for button click here
};
</script>


<style scoped>
/* Add any button-specific styles here */
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
