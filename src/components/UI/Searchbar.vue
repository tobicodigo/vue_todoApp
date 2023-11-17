<template>
  <ion-searchbar
    show-clear-button="always"
    :clear-icon="trashBin"
    animated="true"
    :placeholder="$t('search')"
  ></ion-searchbar>
</template>

<script lang="ts">
import { IonSearchbar } from "@ionic/vue";
import { defineComponent } from "vue";
import { trashBin } from "ionicons/icons";


export default defineComponent({
  components: { IonSearchbar },
  setup() {
    return { trashBin };
  },
});
</script>

<style scoped></style>
