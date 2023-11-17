<template>
  <ion-page>
    <ion-header :translucent="true">
      <tool-bar></tool-bar>
    </ion-header>

    <ion-content :fullscreen="true"> 

      <list></list>

    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonContent, IonHeader, IonPage } from "@ionic/vue";
import ToolBar from "../components/UI/ToolBar.vue";
import List from "../components/List.vue";

import { useStore } from 'vuex'
const store = useStore()

import { ref } from "vue";
</script>
