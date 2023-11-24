<template>
  <form class="form" @submit.prevent="submitForm" style="margin-left: 2rem">
    <div>
      <label for="task-name">{{ $t("taskName") }}</label>
      <input type="text" id="task-name" v-model="task.title" required />
    </div>
    <div>
      <label
        for="task-description"
        style="display: block; margin-bottom: 0.5rem"
        >{{ $t("taskDescription") }}</label
      >
      <textarea
        id="task-description"
        v-model="task.description"
        required
        style="max-width: 100%; margin-right: 0"
      ></textarea>
    </div>
    <div>
      <label for="task-responsible">{{ $t("taskAssignee") }}</label>
      <input
        type="text"
        id="task-responsible"
        v-model="task.assignee"
        required
      />
    </div>
    <div>
      <label for="task-date">{{ $t("taskDate") }}</label>
      <input type="date" id="task-date" v-model="task.dueDate" min="23.12.2023" required />
    </div>
    <div>
      <label for="task-type">{{ $t("taskType") }}</label>
      <select id="task-type" v-model="task.type" required>
        <option value="" disabled>{{ $t("selectType") }}</option>
        <option v-for="(type, index) in $store.state.types" :value="index">
          {{ type }}
        </option>
      </select>
    </div>
    <Button type="submit" color="gray">{{ $t("saveTask") }}</Button>
  </form>
</template>

<script>
import CustomButton from "./Button.vue";
import { useRouter } from "vue-router";

export default {
  props: {
    task: {
      type: Object,
      required: false,
      default: {
        id: 0,
        title: "",
        description: "",
        category: "",
        color: 0,
        startDate: "",
        endDate: "",
        assignee: "",
        isDone: false,
      },
    },
  },
  methods: {
    submitForm() {

      setTimeout(
        function () {
          this.$store.state.tasks.unshift(this.task);
        }.bind(this),
        1000
      );
      this.$router.push("/"+this.$store.state.lastViewType);
    },
    resetForm() {
      this.task = {
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
    },
  },
};
</script>

<style>
form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 500px;
  margin: 0 auto;
  padding: 3rem;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}
title {
  font-size: 2rem;
  font-weight: bold;
  color: #007aff;
  margin-left: 5rem;
}

label {
  font-weight: bold;
}

input,
textarea,
select {
  padding: 0.5rem;
  border-radius: 5px;
  border: none;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
}
</style>
