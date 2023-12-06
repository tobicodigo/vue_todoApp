<template>
  <div>
    <profile-details-form
      v-if="!$store.state.user.loggedIn"
    ></profile-details-form>
    <welcome-box v-else showAddbutton="true" :title="$t('thanksForRegistration')"></welcome-box>
  </div>
</template>

<script>
import ProfileDetailsForm from "../components/ProfileDetailsForm.vue";
import WelcomeBox from "../components/WelcomeBox.vue";

export default {
  components: { ProfileDetailsForm, WelcomeBox },
};
</script>

<style scoped></style>
