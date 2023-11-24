<template>
  <TaskDetailForm :task="task"></TaskDetailForm>
  <CustomButton
    v-if="route.name === 'edit'"
    :task="task"
    color="#FC7675"
    @click="options.modelValue = true"
    >{{ $t("deleteTask") }}</CustomButton
  >
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
    <h1 class="text-xl">{{ $t("deleteTask") }}</h1>
    <p>
      {{ $t("confirmDelete1") }}
    </p>
    <span class="title-span">
      <h1 class="task-title text-xl">{{ task.title }}</h1>
    </span>
    <span id="cancelButton">
      <CustomButton @click="options.modelValue = false" color="gray">{{
        $t("cancel")
      }}</CustomButton></span
    >
    <span id="deleteButton">
      <CustomButton @click="deleteTask(task)" color="#FC7675">{{
        $t("confirmDelete2")
      }}</CustomButton></span
    >
  </VueFinalModal>
</template>

<script setup>
import TaskDetailForm from "../components/TaskDetailsForm.vue";
import CustomButton from "../components/Button.vue";
import { VueFinalModal } from "vue-final-modal";
import { useStore } from "vuex";
import { reactive, ref, watch } from "vue";
const store = useStore();
import { useRoute, useRouter } from "vue-router";
const route = useRoute();
const router = useRouter();

const task = ref(
  store.state.tasks.filter(function (arr) {
    return arr.id == route.params.id;
  })[0]
);

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

function deleteTask(taskToDelete) {
  const index = store.state.tasks.findIndex(
    (key) => key.id === taskToDelete.id
  );

  options.modelValue = false;
  setTimeout(
    function () {
      store.state.tasks.splice(index, 1);
    }.bind(this),
    1000
  );
  console.log(store.state.lastViewType)

  router.push("/" + store.state.lastViewType)
}
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