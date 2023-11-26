<template>
  <form class="form" @submit.prevent="submitForm">
    <label for="task-name">{{ $t("taskName") }}</label>
    <input type="text" id="task-name" v-model="task.title" required />
    <label for="task-description">{{ $t("taskDescription") }}</label>
    <textarea
      id="task-description"
      v-model="task.description"
      required
    ></textarea>

    <label for="task-date">{{ $t("taskDate") }}</label>
    <input
      type="date"
      id="task-date"
      v-model="task.dueDate"
      min="23.12.2023"
      required
    />
    <label for="task-type">{{ $t("taskType") }}</label>
    <select id="task-type" v-model="task.type" required>
      <option value="" disabled>{{ $t("selectType") }}</option>
      <option v-for="(type, index) in $store.state.types" :value="index">
        {{ type }}
      </option>
    </select>
    <custom-button type="submit" color="#458FF1">{{
      $t("saveTask")
    }}</custom-button>
    <slot></slot>
  </form>
</template>

<script>
import CustomButton from "../components/CustomButton.vue";

export default {
  components: { CustomButton },
  props: {
    task: {
      type: Object,
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
    mode: {
      type: String,
      default: "add",
    },
  },
  methods: {
    submitForm() {
      setTimeout(
        function () {
          if (this.mode === "add") {
            this.$store.state.tasks.unshift(this.task);
          } else if (this.mode === "edit") {
            const index = array.findIndex((task) => task.id === this.task.id);
            this.store.state.tasks[index] = this.task;
          }
        }.bind(this),
        1000
      );

      this.$router.push("/" + this.$store.state.lastViewType);
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

<style scoped>
form {
  color: rgb(103, 103, 103);
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 500px;
  margin: 50px auto;
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
  display: block;
  font-weight: bold;
  width: 100%;
}

input,
textarea,
select {
  height: 40px;
  font-size: large;
  padding: 10px;
  top: 10px;
  width: 100%;
  border-radius: 5px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
}

textarea {
  min-height: 100px;
}
</style>
