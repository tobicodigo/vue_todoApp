<template>
  <form class="form" @submit.prevent="submitForm">
    <span v-if="!user.loggedIn" id="loginLink"
      ><router-link to="/login">{{ $t("loginProfile") }}</router-link></span
    >

    <label for="email" v-if="!user.loggedIn">{{ $t("email") }}</label>
    <input
      type="email"
      v-if="!user.loggedIn"
      id="email"
      v-model="user.email"
      required
      autocomplete="email"
    />
    <div
      class="error"
      v-if="submitResult.description === 1062 && !user.loggedIn"
    >
      {{ $t("profileExists") }}
    </div>
    <label for="name">{{ $t("name") }}</label>
    <input type="text" id="name" v-model="user.name" required />
    <foto-capture
      @on-selected="(i) => (user.photo = i)"
      :base64="user.photo"
    ></foto-capture>
    <hr />
    <label for="password">{{ $t("password") }}</label>
    <input type="password" id="password" v-model="password" />
    <div class="error" v-if="password && !isValidPassword">
      {{ $t("passwordStrength") }}
    </div>
    <label for="confirmPassword">{{ $t("confirmPassword") }}</label>
    <input
      type="password"
      id="confirmPassword"
      v-model="confirmPassword"
      :required="!user.loggedIn"
    />

    <div
      class="error"
      v-if="
        password && confirmPassword && password !== confirmPassword
      "
    >
      {{ $t("passwordSimilarity") }}
    </div>

    <label for="question">{{ $t("passwordQuestion") }}</label>
    <input type="text" id="question" v-model="user.pwquestion" required />

    <label for="answer">{{ $t("passwordAnswer") }}</label>
    <input type="text" id="answer" v-model="user.pwanswer" required />

    <hr />
    <custom-button type="submit" color="#458FF1">
      <span v-if="!user.loggedIn"> {{ $t("sendRegistration") }}</span>
      <span v-else> {{ $t("updateProfile") }}</span>
    </custom-button>
  </form>
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
      password: "",
      submitResult: {},
    };
  },
  props: {
    user: {
      type: Object,
      default: {
        email: "",
        password: "",
        name: "",
        pwquestion: "",
        pwanswer: "",
        photo: "",
        loggedIn: "",
      },
    },
  },
  mounted() {
    if (this.user.loggedIn) {
      this.password = "";
    }
  },
  computed: {
    isValidPassword() {
      const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[^\w\d\s:])([^\s]){8,}$/;
      return regex.test(this.password);
    },
  },
  methods: {
    submitForm() {
      console.log("submit" + this.user);

      const sendRegistration = async () => {
        const data = await ApiController.createUser(this.user);
        this.submitResult = data;

        if (this.submitResult.message === "Item created") {
          this.user.loggedIn = true;
          this.user.id= this.submitResult.id 
          this.$store.state.user = this.user;
        }
      };

      const updateProfile = async () => {
        this.user.password = this.password;
        const data = await ApiController.updateProfile(this.user);
        this.submitResult = data;

        if (this.submitResult.message === "Profile updated") {
          this.$store.state.user = this.user;
          this.$store.state.profileRecentlyUpdated = true;

          setTimeout(
            function () {
              this.$router.push("/profile");
            }.bind(this),
            3000
          );

          setTimeout(
            function () {
              this.$router.push("/profile");
              this.$store.state.profileRecentlyUpdated = false;
            }.bind(this),
            5000
          );
        }
      };

      if (!this.user.loggedIn) {
        sendRegistration();
      } else {
        updateProfile();
      }
    },
  },
};
</script>

<style scoped>
#loginLink {
  text-align: right;
  padding-top: 0px;
  padding-bottom: 10px;
}

hr {
  margin: 10px 0px 10px;
}

h2 {
  font-size: large;
  padding: 10px;
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
