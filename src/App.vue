<template>
  <ion-app>
    <ion-page>
      <ModalsContainer />

      <ion-header :translucent="true">
        <tool-bar :viewType="route.name" :heading="heading"></tool-bar>
      </ion-header>

      <ion-content class="content">
        <router-view></router-view>
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
import 'vue-final-modal/style.css'
import { ModalsContainer } from 'vue-final-modal'
import apiController from './api/api'

const blabla=apiController.getTasks()
console.log("TESTTTT")
console.log(blabla)


const route = useRoute();
const { t } = useI18n();

const heading = computed(() => {
  if(!route.name) {
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
</style>
