<template>
  <ion-toolbar>
    <ion-title>My Tasks</ion-title>
    <ion-button href="/filter">Filter</ion-button>
    <ion-button href="/add">Add</ion-button>

   


  </ion-toolbar>
</template>

<script setup lang="ts">
import { IonTitle, IonToolbar } from "@ionic/vue";
import { ref } from "vue";
</script>

<style scoped>
ion-title {
  display:inline-flex;
}


</style>
