<template>
  <ion-page>
    <ion-header :translucent="true">
      <tool-bar :viewType="viewType"></tool-bar>
    </ion-header>

    <ion-content :fullscreen="true"> 

      <list :viewType="viewType"></list>

    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonContent, IonHeader, IonPage } from "@ionic/vue";
import { ref } from "vue"
import ToolBar from "../components/UI/ToolBar.vue";
import List from "../components/List.vue";

import { useStore } from 'vuex'
const store = useStore()
import { useRoute, useRouter } from 'vue-router'
const route = useRoute();

const viewType = ref("main")
viewType.value = route.name
console.log(viewType.value)
</script>
