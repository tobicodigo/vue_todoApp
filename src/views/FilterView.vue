<template>
  <!-- Form for applying filters -->
  <div>
    <form class="form" @submit.prevent>
      <!-- Filter by start date -->
      <label for="task-date">{{ $t("filterStartDate") }}</label>
      <input type="date" id="task-date" v-model="filter.startDate" />

      <!-- Filter by end date -->
      <label for="task-date">{{ $t("filterEndDate") }}</label>
      <input type="date" id="task-date" v-model="filter.endDate" />

      <!-- Filter by color using ColorPicker component -->
      <label for="color-picker">{{ $t("pickColor") }}</label>
      <color-picker
        id="color-picker"
        v-model="filter.color"
        :key="filter.color"
      ></color-picker>

      <!-- Filter by task type using select dropdown -->
      <label for="task-type">{{ $t("taskType") }}</label>
      <select id="task-type" v-model="filter.type">
        <option value="none"></option>
        <option
          v-for="(type, index) in store.state.types"
          :key="index"
          :value="index"
        >
          {{ type }}
        </option>
      </select>

      <hr />

      <!-- Apply filter button -->
      <custom-button type="submit" color="#458FF1" @click="applyFilter">
        {{ $t("filterTask") }}
      </custom-button>

      <!-- Reset filter button -->
      <custom-button type="submit" color="#ACACAC" @click="resetFilter">
        {{ $t("resetFilter") }}
      </custom-button>
      <slot></slot>
    </form>
  </div>
</template>

<script setup>
// Importing necessary components and hooks
import CustomButton from "../components/CustomButton.vue";
import ColorPicker from "../components/ColorPicker.vue";
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import { useStore } from "vuex";

// Creating references
const i18n = useI18n();
const store = useStore();
const route = useRoute();
const router = useRouter();

// Creating a reactive reference for filter state
const filter = ref({});

// Executing code on component mount
onMounted(() => {
  // Resetting store filter state and setting saved filter if available
  store.state.filter = {};
  if (Object.keys(store.state.savedFilter).length > 0) {
    filter.value = store.state.savedFilter;
  }
});

// Applying filter logic
const applyFilter = () => {
  setTimeout(function () {
    store.state.savedFilter = filter.value;
    store.state.filter = store.state.savedFilter;
    filter.value = {};
  }, 1000);
  router.push("/" + store.state.lastViewType);
};

// Resetting filter logic
const resetFilter = () => {
  store.state.filter = {};
  store.state.savedFilter = {};
  filter.value = {};
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
