<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>My Tasks</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
     

      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Inbox</ion-title>
        </ion-toolbar>
      </ion-header>

    
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonContent,
  IonHeader,
  IonList,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  IonTitle,
  IonToolbar,
} from '@ionic/vue';
import { ref } from 'vue';


</script>
