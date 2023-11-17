<template>
  <ul>
    <List-item
      v-for="task in store.state.tasks"
      :task="task"
      :key="task.id"
    ></List-item>
  </ul>
</template>

<script setup>
import ListItem from "../components/UI/ListItem.vue";
import { useStore } from "vuex";
const store = useStore();
</script>

<style>
ul {
  width: 100%;
  list-style: none;
  display: block;
  margin-block-start: 0em;
  margin-block-end: 0em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  padding-inline-start: 0px;
}
</style>
