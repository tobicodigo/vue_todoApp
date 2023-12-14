<template>
  <div>
    <!-- Form for filtering tasks -->
    <form class="form" @submit.prevent>
      <!-- Start Date input -->
      <label for="task-start-date">{{ $t("filterStartDate") }}</label>
      <input type="date" id="task-start-date" v-model="filter.startDate" />

      <!-- End Date input -->
      <label for="task-end-date">{{ $t("filterEndDate") }}</label>
      <input type="date" id="task-end-date" v-model="filter.endDate" />

      <!-- Color Picker component -->
      <label for="color-picker">{{ $t("pickColor") }}</label>
      <color-picker
        id="color-picker"
        name="color-picker"
        v-model="filter.color"
        :key="filter.color"
      ></color-picker>

      <!-- Task Type dropdown -->
      <label for="task-type">{{ $t("taskType") }}</label>
      <select id="task-type" v-model="filter.type">
        <option value="none"></option>
        <!-- Options based on types from Vuex store -->
        <option
          v-for="(type, index) in store.state.types"
          :key="index"
          :value="index"
        >
          {{ type }}
        </option>
      </select>

      <hr />

      <!-- Apply Filter button -->
      <custom-button type="submit" color="#458FF1" @click="applyFilter">{{
        $t("filterTask")
      }}</custom-button>

      <!-- Reset Filter button -->
      <custom-button type="submit" color="#ACACAC" @click="resetFilter">{{
        $t("resetFilter")
      }}</custom-button>

      <!-- Slot for additional content -->
      <slot></slot>
    </form>
  </div>
</template>

<script setup>
// Importing necessary components and libraries
import CustomButton from "../components/CustomButton.vue";
import ColorPicker from "../components/ColorPicker.vue";
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import { useStore } from "vuex";

// Initializing necessary variables and hooks
const i18n = useI18n();
const store = useStore();
const route = useRoute();
const router = useRouter();

// Creating a reactive reference for filter data
const filter = ref({});

// On component mount, set filter state based on saved filter data from Vuex
onMounted(() => {
  store.state.filter = {};
  if (Object.keys(store.state.savedFilter).length > 0) {
    filter.value = store.state.savedFilter;
  }
});

// Function to apply the filter
const applyFilter = () => {
  setTimeout(function () {
    // Save and apply filter data to the Vuex store and route to last view type
    store.state.savedFilter = filter.value;
    store.state.filter = store.state.savedFilter;
    filter.value = {};
  }, 1000);
  router.push("/" + store.state.lastViewType);
};

// Function to reset the filter
const resetFilter = () => {
  // Reset both filter and saved filter data in the Vuex store
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
