<template>
  <!-- Login form if user is not logged in -->
  <div>
    <form class="form" @submit.prevent="login" v-if="!store.state.user.loggedIn">
      <!-- Link to Register -->
      <span id="registerLink">
        <router-link to="/register">{{ $t("registerProfile") }}</router-link>
      </span>

      <!-- Input for email -->
      <label for="email">{{ $t("email") }}</label>
      <input
        type="email"
        id="email"
        v-model="user.email"
        required
        autocomplete="off"
      />

      <!-- Input for password -->
      <label for="password">{{ $t("password") }}</label>
      <input
        type="password"
        id="password"
        v-model="user.password"
        required
        autocomplete="off"
      />

      <!-- Error message for incorrect login -->
      <div class="error" v-if="submitResult.description === 'Login not correct'">
        {{ $t("passwordNotCorrect") }}
      </div>

      <hr />

      <!-- Login button -->
      <custom-button type="submit" color="#458FF1">{{ $t("login") }}</custom-button>

      <!-- Link for forgotten password -->
      <span id="passwordLink">
        <router-link to="/password">{{ $t("forgotPassword") }}</router-link>
      </span>
    </form>

    <!-- Welcome message if user is logged in -->
    <welcome-box v-else showAddbutton="true" :title="$t('thanksForLogin')">
      <!-- Button to show user's tasks -->
      <div class="centered">
        <router-link to="/home">
          <custom-button class="smallButton" color="#458FF1">
            {{ $t("showMyTasks") }}
          </custom-button>
        </router-link>
      </div>
    </welcome-box>
  </div>
</template>

<script setup>
// Importing necessary components and hooks
import { ref } from "vue";
import CustomButton from "../components/CustomButton.vue";
import WelcomeBox from "../components/WelcomeBox.vue";
import ApiController from "../api/api";
import store from "@/store/store";

// Creating reactive references for user, submission result, and login status
const user = ref({});
const submitResult = ref({});
const loginIsOk = ref(false);

// Function for user login
const login = async () => {
  const data = await ApiController.login(user.value);
  submitResult.value = data;

  // If login successful, set login status
  if (submitResult.value.message === "Login succesfull") {
    loginIsOk.value = true;
  }
};
</script>


<style scoped>
#registerLink {
  text-align: right;
  padding-top: 0px;
  padding-bottom: 10px;
}

#passwordLink {
  text-align: right;
  padding-top: 10px;
  padding-bottom: 20px;
}

hr {
  margin: 10px 0px 10px;
}

label {
  display: block;
  font-weight: bold;
  width: 100%;
}

input {
  height: 40px;
  font-size: large;
  padding: 10px;
  top: 10px;
  width: 100%;
  border-radius: 5px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
}
.error {
  color: rgb(244, 143, 143);
}
</style>
