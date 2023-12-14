<template>
  <!-- Task Detail Form and VueFinalModal components -->
  <div>
    <!-- Task Detail Form component -->
    <TaskDetailForm :task="task" :mode="route.name">
      <!-- Delete button for task deletion (visible in 'edit' mode) -->
      <custom-button
        v-if="route.name === 'edit'"
        color="#FC7675"
        @click="options.modelValue = true"
      >
        {{ $t("deleteTask") }}
      </custom-button>
    </TaskDetailForm>

    <!-- VueFinalModal for task deletion confirmation -->
    <VueFinalModal
      v-model="options.modelValue"
      :teleport-to="options.teleportTo"
      :display-directive="options.displayDirective"
      :hide-overlay="options.hideOverlay"
      :overlay-transition="options.overlayTransition"
      :content-transition="options.contentTransition"
      :click-to-close="options.clickToClose"
      :esc-to-close="options.escToClose"
      :background="options.background"
      :lock-scroll="options.lockScroll"
      :reserve-scroll-bar-gap="options.reserveScrollBarGap"
      :swipe-to-close="options.swipeToClose"
      class="flex justify-center items-center"
      content-class="max-w-xl mx-4 p-4 bg-white dark:bg-gray-900 border dark:border-gray-700 rounded-lg space-y-2"
    >
      <!-- Modal content: Task deletion confirmation -->
      <h1 class="text-xl">{{ $t("deleteTask") }}</h1>
      <p>{{ $t("confirmDelete1") }}</p>
      <span class="title-span">
        <h1 class="task-title text-xl">{{ task.title }}</h1>
      </span>
      <span id="cancelButton">
        <!-- Cancel deletion button -->
        <custom-button @click="options.modelValue = false" color="#ACACAC">
          {{ $t("cancel") }}
        </custom-button>
      </span>
      <span id="deleteButton">
        <!-- Confirm deletion button -->
        <custom-button @click="deleteTask(task)" color="#FC7675">
          {{ $t("confirmDelete2") }}
        </custom-button>
      </span>
    </VueFinalModal>
  </div>
</template>

<script setup>
// Import necessary components and modules
import TaskDetailForm from "../components/TaskDetailsForm.vue";
import CustomButton from "../components/CustomButton.vue";
import { VueFinalModal } from "vue-final-modal";
import { useStore } from "vuex";
import { reactive, ref, watch } from "vue";
import ApiController from "../api/api";
import { useRoute, useRouter } from "vue-router";

// Initialize Vue Router and Vuex Store
const route = useRoute();
const router = useRouter();
const store = useStore();

// Initialize reactive variables
const submitResult = ref();
const task = ref(
  // Get the task based on the route parameter 'id'
  store.state.tasks.filter((arr) => arr.id == route.params.id)[0]
);

// Watch for route changes to reset task values when adding a new task
watch(
  () => route.name,
  (newRoute, oldRoute) => {
    if (route.name === "add") {
      task.value = {
        id: 0,
        title: "",
        description: "",
        category: "",
        color: 0,
        startDate: "",
        endDate: "",
        assignee: "",
        isDone: false,
      };
    }
  }
);

// Define options for VueFinalModal configurations
const options = reactive({
  teleportTo: "body",
  modelValue: false,
  displayDirective: "if",
  hideOverlay: false,
  overlayTransition: "vfm-slide-up",
  contentTransition: "vfm-slide-up",
  clickToClose: true,
  escToClose: true,
  background: "non-interactive",
  lockScroll: true,
  reserveScrollBarGap: true,
  swipeToClose: "none",
});

// Function to delete a task
const deleteTask = (taskToDelete) => {
  // Ensure the user is logged in before proceeding with task deletion
  if (store.state.user.loggedIn) {
    const sendDeleteTask = async () => {
      // Call the API to delete the task
      const data = await ApiController.deleteTask(task.value);
      submitResult.value = data;

      if (submitResult.value.message === "Task deleted") {
        // Task deletion confirmation
      }
    };
    sendDeleteTask();
  }

  // Find the index of the task to be deleted and remove it from the tasks array
  const index = store.state.tasks.findIndex((key) => key.id === taskToDelete.id);
  options.modelValue = false;

  // Remove the task after a delay and redirect to the last view type
  setTimeout(() => {
    store.state.tasks.splice(index, 1);
    router.push("/" + store.state.lastViewType);
  }, 1000);
};
</script>


<style scoped>
p {
  text-align: left;
}

#cancelButton {
  padding-right: 50px;
}

#deleteButton {
  padding-left: 50px;
}
.title-span {
  text-align: center;
}
.task-title {
  padding: 30px 40px 50px 40px;
  font-size: x-large;
}
</style>
