<template>
  <!-- Conditional rendering based on user login status -->
  <div v-if="$store.state.user.loggedIn" class="form centered">
    <!-- Greeting message with user's name and confetti image -->
    <span>
      {{ $t('hello') }} {{ $store.state.user.name }}
      <img
        class="confetti"
        :src="'resources/confetti.gif'"
        alt="Confetti"
      />
    </span>

    <!-- Displaying user's profile picture if available -->
    <img
      v-if="$store.state.user.photo"
      class="profile"
      :src="'data:image/jpeg;base64,' + $store.state.user.photo"
      alt="Profile"
    />
    <!-- Heading title -->
    <h2>{{ props.title }}</h2>

    <!-- Router link to add task page if 'showAddbutton' prop is true -->
    <router-link v-if="props.showAddbutton" to="/add">
      <hr /> <!-- Horizontal line for separation -->
      <!-- Custom button for adding tasks -->
      <custom-button class="smallButton" color="#458FF1">
        {{ $t("startAddTask") }}
      </custom-button>
    </router-link>
    <slot></slot> <!-- Default slot content -->
  </div>
</template>

<script setup>
import CustomButton from "../components/CustomButton.vue"; // Importing the CustomButton component
const props = defineProps(["showAddbutton", "title"]); // Receiving 'showAddbutton' and 'title' props
</script>


<style scoped>

hr {
  margin: 10px 0px 20px;
}



.profile {
  border-radius: 50%;
  overflow: hidden;
  width: 100px;
  height: 100px;
  margin: 20px auto;
}
</style>
