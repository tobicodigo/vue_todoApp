<template>
  <div>
    <!-- Conditional rendering of components based on store state -->
    <profile-details-form
      :user="$store.state.user"
      v-if="!$store.state.profileRecentlyUpdated"
    ></profile-details-form>

    <!-- Render a welcome box if profile was recently updated -->
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

  
  <style scoped></style>
  