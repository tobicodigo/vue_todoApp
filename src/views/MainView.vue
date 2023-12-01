<template>
  <div>
  <list :viewType="route.name"></list>
</div>
</template>

<script setup lang="ts">
import List from "../components/List.vue";
import { useRoute } from "vue-router";
const route = useRoute();

</script>
