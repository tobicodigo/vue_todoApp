<template>
  <list :viewType="route.name"></list>
</template>

<script setup lang="ts">
import List from "../components/List.vue";
import { useRoute } from "vue-router";
const route = useRoute();

</script>
