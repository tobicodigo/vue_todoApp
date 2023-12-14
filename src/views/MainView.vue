<template>
  <!-- Renders List component based on the current route's name -->
  <div>
    <list :viewType="route.name"></list>
  </div>
</template>

<script setup lang="ts">
// Importing the List component and the useRoute function from vue-router
import List from "../components/List.vue";
import { useRoute } from "vue-router";

// Accessing the current route
const route = useRoute();
</script>

