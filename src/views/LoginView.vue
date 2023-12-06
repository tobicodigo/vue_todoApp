<template>
  <div>
    <form
      class="form"
      @submit.prevent="login"
      v-if="!store.state.user.loggedIn"
    >
      <span id="registerLink"
        ><router-link to="/register">{{
          $t("registerProfile")
        }}</router-link></span
      >

      <label for="email">{{ $t("email") }}</label>
      <input
        type="email"
        id="email"
        v-model="user.email"
        required
        autocomplete="off"
      />

      <label for="password">{{ $t("password") }}</label>
      <input
        type="password"
        id="password"
        v-model="user.password"
        required
        autocomplete="off"
      />
      <div
        class="error"
        v-if="submitResult.description === 'Login not correct'"
      >
        {{ $t("passwordNotCorrect") }}
      </div>
      <hr />
      <custom-button type="submit" color="#458FF1">{{
        $t("login")
      }}</custom-button>
      <span id="passwordLink"
        ><router-link to="/password">{{
          $t("forgotPassword")
        }}</router-link></span
      >
    </form>

    <welcome-box v-else showAddbutton="true" :title="$t('thanksForLogin')">
    </welcome-box>
  </div>
</template>

<script setup>
import { ref } from "vue";
import CustomButton from "../components/CustomButton.vue";
import WelcomeBox from "../components/WelcomeBox.vue";

import ApiController from "../api/api";
import store from "@/store/store";

const user = ref({});
const submitResult = ref({});
const loginIsOk = ref(false);

const login = async () => {
  const data = await ApiController.login(user.value);
  submitResult.value = data;

  if (submitResult.value.message === "Login succesfull") {
    loginIsOk.value = true;
    store.state.user = submitResult.value.user;
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
