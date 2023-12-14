<template>
  <TransitionGroup tag="ul" name="list" v-if="props.viewType != 'card'">
    <List-item
      v-for="(task, index) in filteredTasks"
      :task="task"
      :key="task.id"
    ></List-item>
  </TransitionGroup>
  <TransitionGroup tag="ul" name="cards" v-else class="cardList">
    <Card-item
      v-for="(task, index) in filteredTasks"
      :task="task"
      :key="task.id"
    ></Card-item>
  </TransitionGroup>
  <div
    class="noEntriesContainer"
    v-if="filteredTasks.length === 0 && store.state.startPageVisited"
  >
    <div class="noEntries">{{ $t("noEntryHeading") }}</div>
    <span class="noEntriesDescription">{{ $t("noEntryDescription") }}</span>
  </div>

  <div class="qrcode" v-if="store.state.startPageVisited === false">
    <div class="welcome">
      {{ $t('welcome1')}}<br />{{ $t('welcome2')}}<br><br>
      <router-link to="/add">
        <custom-button color="#458FF1">{{
          $t("startAddTask")
        }}</custom-button></router-link
      >
    </div>
    <div v-if="store.state.devicePlatform === 'web'">
      {{ $t('mobileApp')}}
      <img :src="'/resources/qr.png'" />
    </div>
  </div>
</template>

<script setup>
// Importing necessary components and libraries
import { computed, onUpdated } from "vue";
import CustomButton from "../components/CustomButton.vue";
import ListItem from "./ListItem.vue";
import CardItem from "./CardItem.vue";
import { useStore } from "vuex";
const store = useStore();

// Defining props received by the component
const props = defineProps(["viewType"]);

// Updating the last view type in the Vuex store on component update
onUpdated(() => {
  store.state.lastViewType = props.viewType;
});

// Computed property to filter tasks based on various criteria
const filteredTasks = computed(() => {
  let filtered = store.state.tasks;

  // Filtering tasks based on color, type, dates, search string, and sort direction
  if (store.state.filter.color !== undefined) {
    filtered = filtered.filter(
      (task) => task.color === store.state.filter.color
    );
  }

  if (
    store.state.filter.type !== undefined &&
    store.state.filter.type !== "none"
  ) {
    filtered = filtered.filter((task) => task.type === store.state.filter.type);
  }

  if (store.state.filter.startDate !== undefined) {
    filtered = filtered.filter(
      (task) => task.dueDate >= store.state.filter.startDate
    );
  }

  if (store.state.filter.endDate !== undefined) {
    filtered = filtered.filter(
      (task) => task.dueDate <= store.state.filter.endDate
    );
  }

  if (store.state.searchString !== "") {
    filtered = filtered.filter(
      (task) =>
        task.title
          .toLowerCase()
          .includes(store.state.searchString.toLowerCase()) ||
        task.description
          .toLowerCase()
          .includes(store.state.searchString.toLowerCase())
    );
  }

  // Sorting tasks based on the specified sort direction
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


.cards-move,
.cards-enter-active,
.cards-leave-active {
  transition: all 1s cubic-bezier(0.075, 0.82, 0.165, 1);
}
.cards-enter-from,
.cards-leave-to {
  opacity: 0;
  transform: translateX(-2rem);
}
.cards-leave-active {
  position: absolute;
}


.noEntriesContainer {
  gap: 1rem;
  margin: auto;
  margin-top: 10%;
  height: 100%;
  width: 250px;
  height: 250px;
}

.noEntries {
  background-image: url("../speechbubble.png");
  background-repeat: no-repeat, repeat;
  color: #828282;
  width: 250px;
  height: 250px;
  padding: 50px;
  padding-top: 90px;
  font-style: bolder;
}

.noEntriesDescription {
  color: #828282;
  padding-top: 80px;
}

.welcome {
  font-size: larger;
  font-weight: bolder;
  margin-bottom: 23%;
}

.qrcode {
  color: #ab2070;
  text-align: center;
  margin: auto;
  margin-top: 8%;
  height: 100%;
  width: 300px;
  height: 300px;
}

.qrcode img {
  margin: auto;
  max-width: 200px;
}
</style>
