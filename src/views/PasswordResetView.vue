<template>
  <div>
    <form
      v-if="submitResult.message !== 'Password updated'"
      class="form"
      @submit.prevent="setNewPassword"
    >
        <label for="email" v-if="!emailIsOk">{{ $t("email") }}</label>
        <input v-if="!emailIsOk"
          type="email"
          id="email"
          v-model="user.email"
          required
          autocomplete
        />

        <custom-button v-if="!emailIsOk" @click="checkEmail" color="#458FF1">{{
          $t("recoverPassword")
        }}</custom-button>

        <label v-if="emailIsOk && !answerIsOk" for="question">{{ $t("passwordQuestion") }}</label>
        <input v-if="emailIsOk && !answerIsOk"
          type="text"
          id="question"
          v-model="user.question"
          required
          autocomplete="off"
          readonly
        />

        <label v-if="emailIsOk && !answerIsOk" for="answer">{{ $t("passwordAnswer") }}</label>
        <input v-if="emailIsOk && !answerIsOk"
          type="text"
          id="answer"
          v-model="user.answer"
          required
          autocomplete="off"
        />
        <div class="error" v-if="submitResult.description === 'answer incorrect'">
        {{ $t("answerNotCorrect") }}
      </div>
        <custom-button v-if="emailIsOk && !answerIsOk" @click="checkAnswer" color="#458FF1">{{
       $t("checkAnswer")
        }}</custom-button>

      <label v-if="answerIsOk" for="password">{{ $t("newPassword") }}</label>
      <input v-if="answerIsOk"
        type="password"
        id="password"
        v-model="user.password"
        required
        autocomplete="off"
      />
      <div class="error" v-if="user.password && !isValidPassword">
        {{ $t("passwordStrength") }}
      </div>
      <label v-if="answerIsOk" for="confirmPassword">{{ $t("confirmPassword") }}</label>
      <input v-if="answerIsOk"
        type="password"
        id="confirmPassword"
        v-model="confirmPassword"
        required
        autocomplete="off"
      />

      <div
        class="error"
        v-if="
          user.password && confirmPassword && user.password !== confirmPassword
        "
      >
        {{ $t("passwordSimilarity") }}
      </div>

      <hr v-if="answerIsOk" />
      <custom-button v-if="answerIsOk" type="submit" color="#458FF1">{{
        $t("setNewPassword")
      }}</custom-button>
    </form>

    <div v-else class="form success">
      
      <span>{{ $t("passwordResetDone") }}<img
          class="confetti"
          src="resources/confetti.gif"
          alt="confetti"
        /></span>
      
    </div>
  </div>
</template>

<script>
import CustomButton from "../components/CustomButton.vue";
import ApiController from "../api/api";

export default {
  components: { CustomButton, ApiController },
  data() {
    return {
      emailIsOk: false,
      answerIsOk: false,
      confirmPassword: "",
      submitResult : {},
      user: {
        email: "",
        question: "",
        answer: "",
        password: "",
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
    checkEmail() {
      const getSecurityQuestion = async () => {
        const data = await ApiController.getSecurityQuestion(this.user.email);
        this.submitResult = data;

        if (this.submitResult.message === "Question found") {
          this.user.question = this.submitResult.question;
          this.emailIsOk=true;
        }
      };

      getSecurityQuestion();

    },
    checkAnswer() {
      const checkSecurityAnswer = async () => {
        const data = await ApiController.checkSecurityAnswer(this.user.email,this.user.question,this.user.answer);
        this.submitResult = data;

        if (this.submitResult.message === "Answer correct") {
          this.answerIsOk=true;
          this.user.id= this.submitResult.user.id
          this.user.name= this.submitResult.user.name

        } 
      };

      checkSecurityAnswer();

    },

    setNewPassword() {

      const updatePassword = async () => {
        const data = await ApiController.updatePassword(this.user);
        this.submitResult = data;

        if (this.submitResult.message === "Password updated") {
          this.$store.state.user.password = this.user.password;
          
          setTimeout(
        function () {
          this.$router.push("/login");
        }.bind(this),
        3000
      );

        }
      };

      updatePassword();
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

.success {
  text-align: center;
  font-size: large;
}

.addButton {
  margin: 30px auto;
  width: 70%;
  font-size: 15px;
}

#question {
  box-shadow: none;
  text-align: center;
}
</style>
