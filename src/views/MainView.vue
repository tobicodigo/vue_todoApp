<template>
  <ion-page>
    <ion-header :translucent="true"> 
      <tool-bar></tool-bar>

    </ion-header>

    <ion-content :fullscreen="true"> </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonContent, IonHeader, IonPage } from "@ionic/vue";
import ToolBar from "../components/ToolBar.vue";
import { ref } from "vue";
</script>
