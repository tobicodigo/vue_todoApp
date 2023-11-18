<template>
  <ul v-if="viewType!='Card'">
    <List-item
      v-for="task in store.state.tasks"
      :task="task"
      :key="task.id"
    ></List-item>
  </ul>





  <ul v-else class="cardList">
    <Card-item
      v-for="(task, index) in store.state.tasks"
      :task="task"
      :key="task.id"
    ></Card-item>
  </ul>

</template>

<script setup>
import ListItem from "../components/UI/ListItem.vue";
import CardItem from "../components/UI/CardItem.vue";

import { useStore } from "vuex";
const store = useStore();

const props = defineProps(["viewType"]);
const viewType = props.viewType;

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

.cardList {
  width:100%;
}
</style>
