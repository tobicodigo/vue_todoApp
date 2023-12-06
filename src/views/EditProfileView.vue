<template>
    <div>
      <profile-details-form :user="$store.state.user"
        v-if="!$store.state.profileRecentlyUpdated"
      ></profile-details-form>
      <welcome-box v-else :showAddbutton="false" :title="$t('profileSaved')"></welcome-box>

    </div>
  </template>
  
  <script setup>
  import ProfileDetailsForm from "../components/ProfileDetailsForm.vue";
  import WelcomeBox from "../components/WelcomeBox.vue";
  
  
  </script>
  
  <style scoped></style>
  