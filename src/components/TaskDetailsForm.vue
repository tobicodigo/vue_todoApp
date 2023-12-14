<template>
  <!-- Form for creating/editing a task -->
  <form class="form" @submit.prevent="submitForm">
    <!-- Task Name input -->
    <label for="task-name">{{ $t("taskName") }}</label>
    <input type="text" id="task-name" v-model="task.title" required />

    <!-- Task Description textarea -->
    <label for="task-description">{{ $t("taskDescription") }}</label>
    <textarea id="task-description" v-model="task.description" required></textarea>

    <!-- Task Due Date input -->
    <label for="task-date">{{ $t("taskDate") }}</label>
    <input
      type="date"
      id="task-date"
      v-model="task.dueDate"
      min="23.12.2023"
      required
    />

    <!-- Color Picker component -->
    <label for="color-picker">{{ $t("pickColor") }}</label>
    <color-picker id="color-picker" v-model="task.color"></color-picker>

    <!-- Task Type selection -->
    <label for="task-type">{{ $t("taskType") }}</label>
    <select id="task-type" v-model="task.type" required>
      <option value="" disabled>{{ $t("selectType") }}</option>
      <option v-for="(type, index) in $store.state.types" :value="index">
        {{ type }}
      </option>
    </select>

    <hr />

    <!-- Custom Button for form submission -->
    <custom-button type="submit" color="#458FF1">
      {{ $t("saveTask") }}
    </custom-button>

    <!-- Slot for additional content -->
    <slot></slot>
  </form>
</template>

<script>
// Importing necessary Vue components and API controller
import CustomButton from "../components/CustomButton.vue";
import ColorPicker from "../components/ColorPicker.vue";
import ApiController from "../api/api";

export default {
  components: { CustomButton, ColorPicker, ApiController },
  props: {
    // Task object and mode (add/edit) as props
    task: {
      type: Object,
      default: {
        id: 0,
        title: "",
        description: "",
        color: 0,
        assignee: "",
        createdBy: "",
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
      if (this.mode === "add") {
        this.addTask();
      } else if (this.mode === "edit") {
        this.editTask();
      }
    },
    addTask() {
      if (this.$store.state.user.loggedIn) {
        const sendCreateTask = async () => {
          this.task.createdBy = this.$store.state.user.id;
          const data = await ApiController.createTask(this.task);
          this.submitResult = data;
          console.log(this.submitResult);

          if (this.submitResult.message === "Task created") {
            this.task.id = this.submitResult.id;
            this.task.createdDate = this.submitResult.createdDate;
            this.$router.push("/" + this.$store.state.lastViewType);
            setTimeout(
              function () {
                this.$store.state.tasks.unshift(this.task);
              }.bind(this),
              1000
            );
          }
        };
        sendCreateTask();
      } else {
        setTimeout(
          function () {
            this.$store.state.tasks.unshift(this.task);
          }.bind(this),
          1000
        );

        this.$router.push("/" + this.$store.state.lastViewType);
      }
    },
    editTask() {
      if (this.$store.state.user.loggedIn) {
        const sendUpdateTask = async () => {
          const data = await ApiController.updateTask(this.task);
          this.submitResult = data;
          console.log(this.submitResult);

          if (this.submitResult.message === "Task updated") {
            setTimeout(
              function () {
                const index = this.$store.state.tasks.findIndex(
                  (task) => task.id === this.task.id
                );
                this.$store.state.tasks[index] = this.task;
                this.$router.push("/" + this.$store.state.lastViewType);
              }.bind(this),
              1000
            );
          }
        };
        sendUpdateTask();
      } else {
        setTimeout(
          function () {
            const index = this.$store.state.tasks.findIndex(
              (task) => task.id === this.task.id
            );
            this.$store.state.tasks[index] = this.task;
            this.$router.push("/" + this.$store.state.lastViewType);
          }.bind(this),
          1000
        );
      }
    },
    // Method to reset the form fields
    resetForm() {
      // Resetting task object to default values
        this.task = {
        id: 0,
        title: "",
        description: "",
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
hr {
  margin: 10px 0px 10px;
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
