<template>
  <ion-app>
    <ion-page>
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
import ToolBar from "./components/UI/ToolBar.vue";
import { useRoute } from "vue-router";
const route = useRoute();
const { t } = useI18n();

const heading = computed(() => {
  return t(route.name);
});
</script>

<style scoped>
.content {
  height: 300px;
  overflow-y: scroll;
}
</style>
