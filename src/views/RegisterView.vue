<template>
  <!-- Conditional rendering based on user login status -->
  <div>
    <!-- Display profile details form if user is not logged in -->
    <profile-details-form
      v-if="!$store.state.user.loggedIn"
    ></profile-details-form>

    <!-- Display welcome box if user is logged in -->
    <welcome-box
      v-else
      showAddbutton="true"
      :title="$t('thanksForRegistration')"
    ></welcome-box>
  </div>
</template>

<script>
// Import the necessary components
import ProfileDetailsForm from "../components/ProfileDetailsForm.vue";
import WelcomeBox from "../components/WelcomeBox.vue";

export default {
  // Register the components for use in this template
  components: { ProfileDetailsForm, WelcomeBox },
};
</script>

<style scoped></style>
