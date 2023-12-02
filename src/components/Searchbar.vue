<template>
  <ion-searchbar
    show-clear-button="always"
    :clear-icon="trashBin"
    :placeholder="$t('search')"
    v-model="$store.state.searchString"
  ></ion-searchbar>
</template>

<script>
import { IonSearchbar } from "@ionic/vue";
import { defineComponent } from "vue";
import { trashBin } from "ionicons/icons";

export default defineComponent({
  components: { IonSearchbar },
  setup() {
    return { trashBin};
  },
  
});
</script>

<style scoped>
ion-searchbar {
  min-width: max-content;
}

</style>
