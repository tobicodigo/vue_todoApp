<template>
  <div>
    <form
      v-if="!$store.state.user.loggedIn"
      class="form"
      @submit.prevent="submitForm"
    >
      <label for="email">{{ $t("email") }}</label>
      <input
        type="email"
        id="email"
        v-model="user.email"
        required
        autocomplete
      />
      <div class="error" v-if="submitResult.description === 1062">
        {{ $t("profileExists") }}
      </div>
      <label for="password">{{ $t("password") }}</label>
      <input type="password" id="password" v-model="user.password" required />
      <div class="error" v-if="user.password && !isValidPassword">
        {{ $t("passwordStrength") }}
      </div>
      <label for="confirmPassword">{{ $t("confirmPassword") }}</label>
      <input
        type="password"
        id="confirmPassword"
        v-model="confirmPassword"
        required
      />

      {{ submitResult.description }}

      <div
        class="error"
        v-if="
          user.password && confirmPassword && user.password !== confirmPassword
        "
      >
        {{ $t("passwordSimilarity") }}
      </div>

      <label for="name">{{ $t("name") }}</label>
      <input type="text" id="name" v-model="user.name" required />

      <foto-capture @on-selected="(i) => (user.photo = i)"></foto-capture>
      <hr />
      <custom-button type="submit" color="#458FF1">{{
        $t("sendRegistration")
      }}</custom-button>
    </form>

    <div v-else class="form registered">
      <span
        >Hola {{ user.name
        }}<img
          class="confetti"
          src="resources/confetti.gif"
          alt="Foto de perfil"
      /></span>

      <img
        v-if="$store.state.user.photo"
        class="profile"
        :src="'data:image/jpeg;base64,' + $store.state.user.photo"
        alt="Foto de perfil"
      />
      <h2>{{ $t("thanksForRegistration") }}</h2>
      <router-link to="/add"
        ><custom-button class="addButton" color="#458FF1">{{
          $t("startAddTask")
        }}</custom-button></router-link
      >
    </div>
  </div>
</template>

<script>
import CustomButton from "../components/CustomButton.vue";
import FotoCapture from "../components/FotoCapture.vue";
import ApiController from "../api/api";

export default {
  components: { CustomButton, FotoCapture, ApiController },
  data() {
    return {
      confirmPassword: "",
      submitResult: {},
      user: {
        email: "",
        password: "",
        name: "",
        photo: "",
      },
    };
  },
  computed: {
    isValidPassword() {
      const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[^\w\d\s:])([^\s]){8,}$/;
      return regex.test(this.user.password);
    },
  },
  methods: {
    submitForm() {
      console.log("submit" + this.user);
      if (this.isValidPassword && this.user.password === this.confirmPassword) {
        const sendRegistration = async () => {
          const data = await ApiController.createUser(this.user);
          this.submitResult = data;

          if (this.submitResult.message === "Item created") {
            this.user.loggedIn = true;
            this.$store.state.user = this.user;
          }

          return data;
        };
        sendRegistration();
      }
    },
  },
};
</script>

<style scoped>
hr {
  margin: 10px 0px 10px;
}

h2 {
  font-size: large;
  padding: 10px;
}
.form {
  color: rgb(103, 103, 103);
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 500px;
  margin: 50px auto;
  padding: 3rem;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}
title {
  font-size: 2rem;
  font-weight: bold;
  color: #007aff;
  margin-left: 5rem;
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

.profile {
  border-radius: 50%;
  overflow: hidden;
  width: 100px;
  height: 100px;
  margin: 20px auto;
}

.confetti {
  width: 50px;
  display: inline-block;
  padding-left: 20px;
}

.error {
  color: rgb(244, 143, 143);
}

.registered {
  text-align: center;
  font-size: xx-large;
}

.addButton {
  margin: 30px auto;
  width: 70%;
  font-size: 15px;
}
</style>
