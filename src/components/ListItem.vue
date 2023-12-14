<template>
  <!-- Task item display -->
  <li class="flex flex-wrap justify-content">
    <!-- Checkbox to mark task completion -->
    <div class="toggleContainer xl:w-1/12 lg:w-1/6 p-4">
      <toggle
        :checked="task.isDone"
        checkmark="true"
        @setDone="(i) => updateTask(i)"
      >
      </toggle>
    </div>

    <!-- Task content and details -->
    <div class="content xl:w-7/12 lg:w-1/2 p-4">
      <!-- Task title -->
      <h2>{{ task.title }}</h2>
      <!-- Remaining days for task completion -->
      <div class="dueDate">
        {{ remainingDays }}
        <span class="dueDate" v-if="remainingDays === 1"
          >{{ $t("dayLeft") }} </span
        ><span class="dueDate" v-else>{{ $t("daysLeft") }}</span>
        <!-- Clock icon for due date -->
        <ion-img
          class="clockImage"
          src="../../../resources/clock.png"
        ></ion-img>
        {{ formattedDate }}
        <!-- Formatted due date -->
      </div>
      <!-- Task description -->
      <div class="description">{{ task.description }}</div>
    </div>

    <!-- Task details: category, color, and edit button -->
    <div class="editContainer xl:w-2/12 sm:w-1/2 lg:w-1/5 p-4">
      <!-- Task category -->
      <span class="category">{{ store.state.types[task.type] }}</span>
      <!-- Displaying active color -->
      <span class="color" :style="{ backgroundColor: activeColor }"></span>
      <!-- Edit button linking to task edit page -->
      <span class="editButton">
        <router-link :to="'/edit/task/' + task.id">
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
// Importing necessary Vue components and functions
import { IonButton, IonImg } from "@ionic/vue"; // Ionic components
import toggle from "./Toggle.vue"; // Custom toggle component
import { ref } from "vue"; // Vue composition API function
import { useI18n } from "vue-i18n"; // Internationalization function
import { useStore } from "vuex"; // Vuex store function
import ApiController from "../api/api"; // API controller

// Accessing store and i18n instances
const store = useStore();
const i18n = useI18n();

// Defining props
const props = defineProps(["task"]); // Task prop passed to the component
const task = props.task; // Task object from props
const submitResult = ref(); // Reference to store submit result

// Active color based on task color
const activeColor = ref("var(" + store.state.colors[task.color] + ")");

// Calculating remaining days for task completion
const dueDateTimeStamp = new Date(task.dueDate).getTime();
const difference = Math.abs(dueDateTimeStamp - Date.now());
const remainingDays = Math.ceil(difference / (1000 * 60 * 60 * 24));

// Formatting task due date based on locale
const formattedDate = new Date(task.dueDate).toLocaleDateString(
  i18n.locale.value
);

// Method to update task completion status
const updateTask = async (i) => {
  task.isDone = i; // Updating task completion status

  // Sending updated task data to the API controller
  const data = await ApiController.updateTask(task);
  submitResult.value = data; // Storing the submission result

  // Handling task update success if needed
  if (submitResult.value.message === "Task updated") {
    // Perform actions on successful task update
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
