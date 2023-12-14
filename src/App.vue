<template>
  <!-- Ionic application structure -->
  <ion-app>
    <ion-page>
      <!-- Modals container for Vue Final Modal -->
      <ModalsContainer />

      <!-- Ion Header with ToolBar component -->
      <ion-header>
        <tool-bar :viewType="store.state.lastViewType" :heading="heading"></tool-bar>
      </ion-header>

      <!-- Ion Content for main content area -->
      <ion-content class="content">
        <!-- Router view with transition -->
        <router-view v-slot="{ Component, route }">
          <transition name="slide-out-to-top" mode="out-in">
            <!-- Dynamic component rendering based on route -->
            <component :is="Component" :key="route.path" />
          </transition>
        </router-view>
      </ion-content>
    </ion-page>
  </ion-app>
</template>

<script setup lang="ts">
// Import necessary components and modules
import { IonApp, IonContent, IonHeader, IonPage } from "@ionic/vue";
import { Device } from "@capacitor/device";
import { useI18n } from "vue-i18n";
import { computed } from "vue";
import ToolBar from "./components/ToolBar.vue";
import { useRoute } from "vue-router";
import "vue-final-modal/style.css";
import { ModalsContainer } from "vue-final-modal";
import { useStore } from "vuex";

// Initialize Vuex Store and Vue Router
const store = useStore();
const route = useRoute();

// Initialize i18n instance for translation
const { t } = useI18n();

// Fetch device platform information using Capacitor Device API
async function getPlatform() {
  const info = await Device.getInfo();
  store.state.devicePlatform = info.platform;
}

// Call the function to get the platform information
getPlatform();

// Computed property for dynamic heading based on route name or default to "home"
const heading = computed(() => {
  if (!route.name) {
    return t("home");
  }
  return t(route.name.toString());
});
</script>


<style scoped>
.content {
  height: 300px;
  overflow-y: scroll;
}

.slide-out-to-top-enter-active {
  transition: all 0.5s ease-out;
}
.slide-out-to-top-leave-active {
  transition: all 0.5s ease-in;
}
.slide-out-to-top-enter,
.slide-out-to-top-leave-to {
  opacity: 0;
}
</style>

<style>
.form {
  color: rgb(103, 103, 103);
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 500px;
  margin: 0px auto;
  padding: 2rem;
  border: none;
  box-shadow: none;
}

ion-content,
ion-page,
ion-toolbar,
input,
textarea,
select {
  --background: transparent;
  background-color: white;
}

input,
select,
textarea {
  border-color: 1px solid gainsboro;
}

.confetti {
  width: 50px;
  display: inline-block;
  padding-left: 20px;
}

.centered {
  text-align: center;
  font-size: xx-large;
}

.smallButton {
  width: 230px;
  margin: 10px;
}

@media screen and (min-width: 579px) {
  .form {
    margin: 50px auto;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    border-radius: 10px;
  }
  input,
  select,
  textarea {
    border: none;
  }
}
</style>
