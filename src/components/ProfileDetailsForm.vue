<template>
  <!-- User registration/profile form -->
  <form class="form" @submit.prevent="submitForm">
    <!-- Link to login if user is not logged in -->
    <span v-if="!user.loggedIn" id="loginLink">
      <router-link to="/login">{{ $t("loginProfile") }}</router-link>
    </span>

    <!-- Email input for registration -->
    <label for="email" v-if="!user.loggedIn">{{ $t("email") }}</label>
    <input
      type="email"
      v-if="!user.loggedIn"
      id="email"
      v-model="user.email"
      required
      autocomplete="email"
    />

    <!-- Displaying error message if profile already exists -->
    <div
      class="error"
      v-if="submitResult.description === 1062 && !user.loggedIn"
    >
      {{ $t("profileExists") }}
    </div>

    <!-- User's name input -->
    <label for="name">{{ $t("name") }}</label>
    <input type="text" id="name" v-model="user.name" required />

    <!-- Component for capturing user's photo -->
    <foto-capture
      @on-selected="(i) => (user.photo = i)"
      :base64="user.photo"
    ></foto-capture>
    <hr />

    <!-- Password input -->
    <label for="password">{{ $t("password") }}</label>
    <input type="password" id="password" v-model="password" />

    <!-- Displaying error message for password strength -->
    <div class="error" v-if="password && !isValidPassword">
      {{ $t("passwordStrength") }}
    </div>

    <!-- Confirm password input for registration -->
    <label for="confirmPassword">{{ $t("confirmPassword") }}</label>
    <input
      type="password"
      id="confirmPassword"
      v-model="confirmPassword"
      :required="!user.loggedIn"
    />

    <!-- Displaying error message if passwords do not match -->
    <div
      class="error"
      v-if="password && confirmPassword && password !== confirmPassword"
    >
      {{ $t("passwordSimilarity") }}
    </div>

    <!-- User's password question input -->
    <label for="question">{{ $t("passwordQuestion") }}</label>
    <input type="text" id="question" v-model="user.pwquestion" required />

    <!-- User's password answer input -->
    <label for="answer">{{ $t("passwordAnswer") }}</label>
    <input type="text" id="answer" v-model="user.pwanswer" required />

    <hr />

    <!-- Button for form submission -->
    <custom-button type="submit" color="#458FF1">
      <span v-if="!user.loggedIn"> {{ $t("sendRegistration") }}</span>
      <span v-else> {{ $t("updateProfile") }}</span>
    </custom-button>
  </form>
</template>

<script>
// Importing necessary Vue components and API controller
import CustomButton from "../components/CustomButton.vue";
import FotoCapture from "../components/FotoCapture.vue";
import ApiController from "../api/api";

export default {
  components: { CustomButton, FotoCapture },
  data() {
    return {
      confirmPassword: "",
      password: "",
      submitResult: {},
    };
  },
  props: {
    // Defining props for user data
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
    // Resetting password field if the user is logged in
    if (this.user.loggedIn) {
      this.password = "";
    }
  },
  computed: {
    // Checking the validity of the password using a regex pattern
    isValidPassword() {
      const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[^\w\d\s:])([^\s]){8,}$/;
      return regex.test(this.password);
    },
  },
  methods: {
    // Method to submit the form (register/update profile)
    submitForm() {
      // Function to send user registration data
      const sendRegistration = async () => {
        const data = await ApiController.createUser(this.user);
        this.submitResult = data;

        // Update user's logged-in status and store the user data
        if (this.submitResult.message === "Item created") {
          this.user.loggedIn = true;
          this.user.id = this.submitResult.id;
          this.$store.state.user = this.user;
        }
      };

      // Function to update user profile
      const updateProfile = async () => {
        this.user.password = this.password; // Assigning password to user object
        const data = await ApiController.updateProfile(this.user); // Sending updated profile data
        this.submitResult = data; // Storing the submission result

        // Update store and route after profile update success
        if (this.submitResult.message === "Profile updated") {
          this.$store.state.user = this.user;
          this.$store.state.profileRecentlyUpdated = true;

          setTimeout(() => {
            this.$router.push("/profile"); // Redirecting to profile page after 3 seconds
          }, 3000);

          setTimeout(() => {
            // Redirecting again and resetting profile update status after 5 seconds
            this.$router.push("/profile");
            this.$store.state.profileRecentlyUpdated = false;
          }, 5000);
        }
      };

      // Conditionally executing registration or profile update based on user logged-in status
      if (!this.user.loggedIn) {
        sendRegistration(); // Executing registration function
      } else {
        updateProfile(); // Executing profile update function
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
