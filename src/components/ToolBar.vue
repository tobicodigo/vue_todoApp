<template>
  <ion-toolbar>
    <ion-grid>
      <ion-row>
        <ion-col>
          <ion-title>{{ props.heading }}</ion-title>
        </ion-col>
        <ion-col>
          <search-bar></search-bar>
        </ion-col>
        <ion-col>
          <router-link v-if="props.viewType != 'card'" to="/card">
            <ion-button fill="clear"
              ><ion-img
                src="../../../resources/cards.png"
              ></ion-img></ion-button
          ></router-link>
          <router-link to="/home" v-else>
            <ion-button fill="clear"
              ><ion-img src="../../../resources/list.png"></ion-img></ion-button
          ></router-link>
          <ion-button fill="clear" @click="changeDirection"
              >
              <ion-img v-if="store.state.sortDirection==='up'"
                src="../../../resources/sort_up.png"
              ></ion-img>
              <ion-img v-else-if="store.state.sortDirection==='down'"
                src="../../../resources/sort_down.png"
              ></ion-img>
              <ion-img v-else
                src="../../../resources/sort.png"
              ></ion-img>
            </ion-button>
          <router-link to="/filter"
            ><ion-button href="/filter" fill="clear"
              ><ion-img
                src="../../../resources/filter.png"
              ></ion-img></ion-button
          ></router-link>
          <router-link to="/add"
            ><ion-button href="/add" fill="clear"
              ><ion-img src="../../../resources/add.png"></ion-img></ion-button
          ></router-link>
          <router-link to="/register"
            ><ion-button fill="clear"
              ><ion-img
                src="../../../resources/profile.png"
              ></ion-img></ion-button
          ></router-link>
        </ion-col>
      </ion-row>
    </ion-grid>
  </ion-toolbar>
</template>

<script setup lang="ts">
import {
  IonTitle,
  IonToolbar,
  IonButton,
  IonGrid,
  IonCol,
  IonRow,
  IonImg,
} from "@ionic/vue";
import SearchBar from "./Searchbar.vue";
import { useStore } from "vuex";
const store = useStore();
const props = defineProps(["viewType", "heading"]);

function changeDirection() {
 
    if(store.state.sortDirection==="") {
      store.state.sortDirection="up"
    } else
    if(store.state.sortDirection==="up") {
      store.state.sortDirection="down"
    } else
    if(store.state.sortDirection==="down") {
      store.state.sortDirection="up"
    }
}

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
  width: 3vh;
}
</style>