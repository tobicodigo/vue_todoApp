<template>
  <TransitionGroup tag="ul"  name="list" v-if="props.viewType != 'card'">
    <List-item
      v-for="task in filteredTasks"
      :task="task"
      :key="task.id"
    ></List-item>
  </TransitionGroup>
  <TransitionGroup tag="ul"  name="list" v-else class="cardList">
    <Card-item
      v-for="(task, index) in filteredTasks"
      :task="task"
      :key="task.id"
    ></Card-item>
  </TransitionGroup>
</template>

<script setup>
import { computed, onUpdated } from "vue";
import ListItem from "./ListItem.vue";
import CardItem from "./CardItem.vue";
import { useStore } from "vuex";
const store = useStore();

const props = defineProps(["viewType"]);

onUpdated(() => {
  store.state.lastViewType = props.viewType
})

const filteredTasks = computed(() => {
  const filtered = store.state.tasks.filter(
    (task) =>
      task.title
        .toLowerCase()
        .includes(store.state.searchString.toLowerCase()) ||
      task.description
        .toLowerCase()
        .includes(store.state.searchString.toLowerCase())
  );
  if (store.state.sortDirection === "") {
    filtered.sort(function (a, b) {
      return new Date(a.createdDate) - new Date(b.createdDate);
    });
  } else if (store.state.sortDirection === "up") {
    filtered.sort(function (a, b) {
      return new Date(a.dueDate) - new Date(b.dueDate);
    });
  } else if (store.state.sortDirection === "down") {
    filtered.sort(function (a, b) {
      return new Date(b.dueDate) - new Date(a.dueDate);
    });
  }

  return filtered;
});
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
  width: 100%;
}

.list-move,
    .list-enter-active,
    .list-leave-active {
            transition: all 1s cubic-bezier(0.075, 0.82, 0.165, 1);
    }
    .list-enter-from,
    .list-leave-to {
            opacity: 0;
            transform: translateX(-2rem);
    }
    .list-leave-active {
            position: absolute;
    }


</style>
