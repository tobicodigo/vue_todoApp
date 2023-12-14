<template>
  <!-- Ionic toolbar containing grid layout -->
  <ion-toolbar>
    <ion-grid>
      <ion-row>
        <!-- Column for the main title -->
        <ion-col>
          <ion-title>{{ props.heading }}</ion-title>
          <!-- Displaying the heading -->
        </ion-col>
        <!-- Column for the search bar -->
        <ion-col>
          <search-bar></search-bar>
          <!-- Incorporating the search bar component -->
        </ion-col>
        <!-- Column for various action buttons -->
        <ion-col id="#menu">
          <!-- Toggle between card and list view -->
          <router-link v-if="props.viewType != 'card'" to="/card">
            <ion-button fill="clear">
              <ion-img src="resources/cards.png"></ion-img>
            </ion-button>
          </router-link>
          <router-link to="/home" v-else>
            <ion-button fill="clear">
              <ion-img :src="'resources/list.png'"></ion-img>
            </ion-button>
          </router-link>
          <!-- Button to change sorting direction -->
          <ion-button fill="clear" @click="changeDirection">
            <ion-img
              v-if="store.state.sortDirection === 'up'"
              src="resources/sort_up.png"
            ></ion-img>
            <ion-img
              v-else-if="store.state.sortDirection === 'down'"
              src="resources/sort_down.png"
            ></ion-img>
            <ion-img v-else src="resources/sort.png"></ion-img>
          </ion-button>
          <!-- Button to navigate to filter page -->
          <router-link to="/filter">
            <ion-button href="/filter" fill="clear">
              <ion-img src="resources/filter.png"></ion-img>
            </ion-button>
          </router-link>
          <!-- Button to navigate to add task page -->
          <router-link to="/add">
            <ion-button href="/add" fill="clear">
              <ion-img src="resources/add.png"></ion-img>
            </ion-button>
          </router-link>
          <!-- Button to navigate to profile or login page -->
          <router-link :to="profilePath">
            <ion-button fill="clear">
              <ion-img
                v-if="store.state.user.photo.length <= 1"
                src="resources/profile.png"
              ></ion-img>
              <ion-img
                class="profile"
                v-else
                :src="'data:image/jpeg;base64,' + store.state.user.photo"
              ></ion-img>
            </ion-button>
          </router-link>
        </ion-col>
      </ion-row>
    </ion-grid>
  </ion-toolbar>
</template>

<script setup lang="ts">
// Importing necessary Ionic and Vue components
import {
  IonTitle,
  IonToolbar,
  IonButton,
  IonGrid,
  IonCol,
  IonRow,
  IonImg,
} from "@ionic/vue";
import SearchBar from "./Searchbar.vue"; // Importing the Searchbar component
import { useStore } from "vuex"; // Using Vuex store for state management
import { computed } from "vue"; // Importing computed from Vue

const store = useStore(); // Accessing the Vuex store
const props = defineProps(["viewType", "heading"]); // Receiving 'viewType' and 'heading' props

// Function to change the sorting direction
function changeDirection() {
  if (store.state.sortDirection === "") {
    store.state.sortDirection = "up";
  } else if (store.state.sortDirection === "up") {
    store.state.sortDirection = "down";
  } else if (store.state.sortDirection === "down") {
    store.state.sortDirection = "up";
  }
}

// Computed property to determine the profile path based on user login status
const profilePath = computed(() => {
  if (store.state.user.loggedIn) {
    return "/profile"; // Redirects to profile if logged in
  }
  return "/login"; // Redirects to login if not logged in
});
</script>

<style scoped>
ion-title {
  font-size: 25px;
  min-width: 300px;
  color: #f6c0c0bc;
  text-align: left;
  justify-self: left;
  padding-inline: 10px;
}

ion-col {
  display: flex;
  align-items: center;
  justify-content: right;
  text-align: left;
  background-color: white;

  border: solid 1px #fff;
}

ion-img {
  width: 28px;
}

.profile {
  border-radius: 50%;
  overflow: hidden;
  width: 35px;
  height: 35px;
}

@media screen and (min-width: 579px) {
  ion-title {
    font-size: 3vw;
    font-size: max(35px, min(3vw, 100px));
    font-size: clamp(35px, 3vw, 100px);
    width: fit-content;
    color: #f6c0c0bc;
  }
}
</style>
