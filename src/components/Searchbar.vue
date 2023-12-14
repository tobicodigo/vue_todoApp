<template>
  <!-- Ionic search bar component -->
  <ion-searchbar
    show-clear-button="always"
    :clear-icon="trashBin"
    :placeholder="$t('search')"
    v-model="$store.state.searchString"
  ></ion-searchbar>
</template>

<script>
// Importing necessary Ionic Vue components and Vue functions
import { IonSearchbar } from "@ionic/vue";
import { defineComponent } from "vue";
import { trashBin } from "ionicons/icons";

export default defineComponent({
  components: { IonSearchbar }, // Registering IonSearchbar component
  setup() {
    return { trashBin }; // Exposing trashBin icon for use in the template
  },
});
</script>

<style scoped>
ion-searchbar {
  min-width: max-content;
}

@media screen and (max-width: 579px) {
}
</style>
