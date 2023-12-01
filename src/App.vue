<template>
  <ion-app>
    <ion-page>
      <ModalsContainer />

      <ion-header :translucent="true">
        <tool-bar :viewType="route.name" :heading="heading"></tool-bar>
      </ion-header>

      <ion-content class="content">
        <router-view v-slot="{ Component, route }">
          <transition name="slide-out-to-top" mode="out-in">
            <component :is="Component" :key="route.path" />
          </transition>
        </router-view>
      </ion-content>
    </ion-page>
  </ion-app>
</template>

<script setup lang="ts">
import { IonApp, IonContent, IonHeader, IonPage } from "@ionic/vue";
import { useI18n } from "vue-i18n";
import { computed } from "vue";
import ToolBar from "./components/ToolBar.vue";
import { useRoute } from "vue-router";
import "vue-final-modal/style.css";
import { ModalsContainer } from "vue-final-modal";
import ApiController from "./api/api";

ApiController.getTasks();
ApiController.editTask();
ApiController.deleteTask();

const route = useRoute();
const { t } = useI18n();

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
.slide-out-to-top-enter, .slide-out-to-top-leave-to {
  opacity: 0;
}
</style>
