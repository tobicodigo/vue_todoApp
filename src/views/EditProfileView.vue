<template>
  <!-- Container for the profile page -->
  <div>
    <!-- Render the ProfileDetailsForm component if profileRecentlyUpdated is false -->
    <profile-details-form
      :user="$store.state.user"
      v-if="!$store.state.profileRecentlyUpdated"
    ></profile-details-form>

    <!-- Render the WelcomeBox component if profileRecentlyUpdated is true -->
    <welcome-box
      v-else
      :showAddbutton="false"
      :title="$t('profileSaved')"
    ></welcome-box>
  </div>
</template>

<script setup>
// Importing necessary components
import ProfileDetailsForm from "../components/ProfileDetailsForm.vue";
import WelcomeBox from "../components/WelcomeBox.vue";
</script>

<style scoped>
</style>
