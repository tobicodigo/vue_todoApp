<template>
  <div>
    <welcome-box show-addbutton="true" :title="$t('profileActions')">
      <div class="centered">
        <router-link to="/editprofile"
          ><custom-button class="smallButton" color="#458FF1">{{
            $t("editProfile")
          }}</custom-button></router-link
        >
        <custom-button class="smallButton" color="#ACACAC" @click="logout">{{
          $t("logout")
        }}</custom-button>
        <custom-button
          class="smallButton"
          color="#FC7675"
          @click="options.modelValue = true"
          >{{ $t("deleteProfile") }}</custom-button
        >
      </div>
    </welcome-box>

    <vue-final-modal
      v-model="options.modelValue"
      :teleport-to="options.teleportTo"
      :display-directive="options.displayDirective"
      :hide-overlay="options.hideOverlay"
      :overlay-transition="options.overlayTransition"
      :content-transition="options.contentTransition"
      :click-to-close="options.clickToClose"
      :esc-to-close="options.escToClose"
      :background="options.background"
      :lock-scroll="options.lockScroll"
      :reserve-scroll-bar-gap="options.reserveScrollBarGap"
      :swipe-to-close="options.swipeToClose"
      class="flex justify-center items-center"
      content-class="max-w-xl mx-4 p-4 bg-white dark:bg-gray-900 border dark:border-gray-700 rounded-lg space-y-2"
    >
      <h1 class="text-xl">{{ $t("deleteProfile") }}</h1>
      <p>
        {{ $t("confirmDelete1") }}
      </p>
      <span class="title-span">
        <h1 class="box-title text-xl">{{ store.state.user.name }}</h1>
      </span>
      <span id="cancelButton">
        <custom-button @click="options.modelValue = false" color="#ACACAC">{{
          $t("cancel")
        }}</custom-button></span
      >
      <span id="deleteButton">
        <custom-button @click="deleteProfile" color="#FC7675">{{
          $t("confirmDeleteProfile")
        }}</custom-button></span
      >
    </vue-final-modal>
  </div>
</template>

<script setup>
import WelcomeBox from "../components/WelcomeBox.vue";
import CustomButton from "../components/CustomButton.vue";
import { VueFinalModal } from "vue-final-modal";
import { onBeforeUpdate, reactive,ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import ApiController from "../api/api";

const router = useRouter();
const store = useStore();

const submitResult = ref({});

const options = reactive({
  teleportTo: "body",
  modelValue: false,
  displayDirective: "if",
  hideOverlay: false,
  overlayTransition: "vfm-slide-up",
  contentTransition: "vfm-slide-up",
  clickToClose: true,
  escToClose: true,
  background: "non-interactive",
  lockScroll: true,
  reserveScrollBarGap: true,
  swipeToClose: "none",
});

onBeforeUpdate(() => {
  if (!store.state.user.loggedIn) {
    router.push("/login");
  }
});

const deleteProfile = () => {
  const sendDeleteProfile = async () => {
    const data = await ApiController.deleteProfile(store.state.user);
    submitResult.value = data;
    console.log(submitResult.value.message)

    if (submitResult.value.message === "Profile deleted") {
      setTimeout(function () {
        options.modelValue = false;
        logout()
      }.bind(this), 1000);
      
    }
  };
  sendDeleteProfile();
};

const logout = () => {
  setTimeout(
    function () {
      store.state.user.loggedIn = false;
      store.state.user.photo = "";

      router.push("/login");
    }.bind(this),
    1000
  );
};
</script>

<style scoped>
p {
  text-align: left;
}

.form {
  gap: 0;
}

h2 {
  font-size: large;
  padding: 10px;
}

#cancelButton {
  padding-right: 50px;
}

#deleteButton {
  padding-left: 50px;
}
.title-span {
  text-align: center;
}
.box-title {
  padding: 30px 40px 50px 40px;
  font-size: x-large;
}
</style>
