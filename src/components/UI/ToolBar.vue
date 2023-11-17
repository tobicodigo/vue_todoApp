<template>
  <ion-toolbar>
    <ion-grid>
      <ion-row>
        <ion-col>
          <ion-title> {{ $t('myTasks') }}</ion-title>
        </ion-col>
        <ion-col>
          <search-bar></search-bar>
        </ion-col>
        <ion-col>
          <ion-button href="/card" fill="clear"><ion-img src="../../../resources/cards.png"></ion-img></ion-button>
          <ion-button href="/filter" fill="clear"><ion-img src="../../../resources/filter.png"></ion-img></ion-button>
          <ion-button href="/add" fill="clear"><ion-img src="../../../resources/add.png"></ion-img></ion-button>
          <ion-button href="/profile" fill="clear"><ion-img src="../../../resources/profile.png"></ion-img></ion-button>

        </ion-col>
      </ion-row>
    </ion-grid>
  </ion-toolbar>
</template>

<script setup lang="ts">
import { IonTitle, IonToolbar, IonButton,IonGrid,IonCol,IonRow,IonImg } from "@ionic/vue";
import SearchBar from "../UI/Searchbar.vue";

import { ref } from "vue";
</script>

<style scoped>

ion-title {
  font-size: 3vw;
  color: #fce3e3;
}

ion-col {
    display: flex;
    align-items: center;
    justify-content: right;
    text-align: left;

    border: solid 1px #fff;
  }

ion-img {
  width:3vh;
}

</style>
