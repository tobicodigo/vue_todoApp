<template>
  <li class="flex flex-wrap justify-content">
    <!-- Container for task completion toggle -->
    <div class="toggleContainer xl:w-1/12 lg:w-1/6 p-4">
      <!-- Toggle component for task completion -->
      <toggle
        :checked="task.isDone"
        checkmark="true"
        @setDone="(i) => updateTask(i)"
      ></toggle>
    </div>

    <!-- Main content section for task details -->
    <div class="content xl:w-7/12 lg:w-1/2 p-4">
      <!-- Task title -->
      <h2>{{ task.title }}</h2>
      <!-- Due date information -->
      <div class="dueDate">
        {{ remainingDays }}
        <span class="dueDate" v-if="remainingDays === 1"
          >{{ $t("dayLeft") }} </span
        ><span class="dueDate" v-else>{{ $t("daysLeft") }}</span>
        <ion-img
          class="clockImage"
          src="../../../resources/clock.png"
        ></ion-img>
        <!-- Formatted due date -->
        {{ formattedDate }}
      </div>

      <!-- Task description -->
      <div class="description">{{ task.description }}</div>
    </div>

    <!-- Container for category, color indicator, and edit button -->
    <div class="editContainer xl:w-2/12 sm:w-1/2 lg:w-1/5 p-4">
      <!-- Task category -->
      <span class="category">{{ store.state.types[task.type] }}</span>
      <!-- Color indicator -->
      <span class="color" :style="{ backgroundColor: activeColor }"></span>
      <!-- Link to edit task -->
      <span class="editButton">
        <router-link :to="'/edit/task/' + task.id">
          <!-- Edit button icon -->
          <ion-button fill="clear"
            ><ion-img
              class="editButton"
              src="../../../resources/menu.png"
            ></ion-img
          ></ion-button>
        </router-link>
      </span>
    </div>
  </li>
</template>

<script setup>
// Importing necessary components and libraries
import { IonButton, IonImg } from "@ionic/vue";
import toggle from "./Toggle.vue";
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import { useStore } from "vuex";
import ApiController from "../api/api";
const store = useStore();
const i18n = useI18n();

// Defining props and variables
const props = defineProps(["task"]);
const task = props.task;
const submitResult = ref();
const activeColor = ref("var(" + store.state.colors[task.color] + ")");

// Calculating remaining days for the task
const dueDateTimeStamp = new Date(task.dueDate).getTime();
const difference = Math.abs(dueDateTimeStamp - Date.now());
const remainingDays = Math.ceil(difference / (1000 * 60 * 60 * 24));

// Formatting date based on locale
const formattedDate = new Date(task.dueDate).toLocaleDateString(
  i18n.locale.value
);

// Function to update task completion status
const updateTask = async (i) => {
  task.isDone = i;

  const data = await ApiController.updateTask(task);
  submitResult.value = data;

  // Checking for successful task update
  if (submitResult.value.message === "Task updated") {
    // Additional logic can be added here
  }
};
</script>


<style scoped>
h2 {
  font-size: x-large;
  font-weight: bold;
  padding-bottom: 5px;
}
.category {
  margin-right: 30px;
  width: 50px;
  height: 50px;
  padding: 10px;
}

.color {
  min-width: 30px;
  min-height: 30px;
  width: 30px;
  height: 30px;
  padding-left: 20px;
  padding-right: 20px;
}

.editButton {
  margin-top: -10px;
  width: 50px;
  height: 50px;
}

h2 {
  margin-top: 10px;
  color: #ad9797;
}

.flex {
  justify-content: center;
}
.description {
  padding-top: 10px;
  color: #ad9797;
}

.dueDate {
  color: #97a1ad;
  padding-right: 5px;
}

.clockImage {
  margin-top: -3px;
  display: inline-block;
  width: 20px;
  vertical-align: middle;
}

li {
  height: 100%;
  min-height: 100px;
  background-color: rgb(255, 255, 255);
  border: 1px solid #f6f2f2;
}

.toggleContainer {
  background-color: white;
  text-align: left;
  padding-top: 50px;
  justify-content: space-around;
  min-width: 100px;
}

.content {
  padding-left: 20px;
  padding-right: 20px;
  padding-bottom: 30px;
}

.editContainer {
  padding-bottom: 30px;
  padding-top: 45px;
  text-align: right;
  min-width: 300px;
}

@media screen and (max-width: 750px) {
  .toggleContainer {
    width: 100%;
    text-align: right;
    padding: 20px 0px 0px 0px;
  }

  .content {
    width: 100%;
    padding: 0px 30px 0px 30px;
  }

  .editContainer {
    width: 100%;
    text-align: right;
    padding: 30px 10px 30px 0px;
  }
}
</style>
