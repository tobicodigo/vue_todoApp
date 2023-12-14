<template>
  <!-- Image upload section -->
  <label for="photo">{{ $t("picture") }}</label>
  <!-- Label for photo input -->
  <img id="profile" :src="imageUrl" alt="Foto de perfil" />
  <!-- Displaying the profile image -->
  <input
    type="file"
    id="photo"
    v-on:change="onFileChanged"
    style="display: none"
  />
  <!-- Hidden file input for photo upload -->
  <input
    type="button"
    :value="$t('browseFoto')"
    onclick="document.getElementById('photo').click();"
  />
  <!-- Button to trigger file input -->
</template>

<script setup>
// Importing necessary Vue composition API functions
import { ref, onMounted, defineProps, defineEmits } from "vue";

// Defining props and emits
const props = defineProps(["base64"]); // Props for base64 image data
const imageUrl = ref("resources/profile_animated.gif"); // Reference for image URL

const emit = defineEmits(["on-selected"]); // Emitting event on image selection

// Executing code when the component is mounted
onMounted(() => {
  // Setting the image URL if base64 data is provided in props
  if (props.base64) {
    imageUrl.value = "data:image/jpeg;base64," + props.base64;
  }
});

// Method to handle file input change
const onFileChanged = (event) => {
  const file = event.target.files[0]; // Getting the selected file
  if (file) {
    const reader = new FileReader(); // Creating a FileReader object
    reader.onload = (e) => {
      imageUrl.value = e.target.result; // Setting the image URL to the uploaded file
      const base64Data = imageUrl.value.split(",")[1]; // Extracting base64 data
      emit("on-selected", base64Data); // Emitting 'on-selected' event with base64 data
    };
    reader.readAsDataURL(file); // Reading the file as a data URL
  }
};
</script>

<style scoped>
#profile {
  border-radius: 50%;
  overflow: hidden;
  width: 80px;
  height: 80px;
  margin: 0 auto;
}
label {
  display: block;
  font-weight: bold;
  width: 100%;
}
</style>
