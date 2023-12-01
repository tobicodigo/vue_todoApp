<template><div>
  <form class="form" @submit.prevent>
    <label for="task-date">{{ $t("filterStartDate") }}</label>
    <input type="date" id="task-date" v-model="filter.startDate" />
    <label for="task-date">{{ $t("filterEndDate") }}</label>
    <input type="date" id="task-date" v-model="filter.endDate" />

    <label for="color-picker">{{ $t("pickColor") }}</label>
    <color-picker
      id="color-picker"
      v-model="filter.color"
      :key="filter.color"
    ></color-picker>

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
    <custom-button type="submit" color="#458FF1" @click="applyFilter">{{
      $t("filterTask")
    }}</custom-button>

    <custom-button type="submit" color="#ACACAC" @click="resetFilter">{{
      $t("resetFilter")
    }}</custom-button>
    <slot></slot>
  </form>
</div>
</template>

<script setup>
import CustomButton from "../components/CustomButton.vue";
import ColorPicker from "../components/ColorPicker.vue";
import { ref, watch,onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import { useStore } from "vuex";
const i18n = useI18n();
const store = useStore();
const route = useRoute();
const router = useRouter();

const filter = ref({})

onMounted(() => {
  store.state.filter={}
  console.log("!!")
  if(Object.keys(store.state.savedFilter).length>0) {
    console.log("!!!!!")

  filter.value = store.state.savedFilter
  }
});


const applyFilter = () => {
  setTimeout(
    function () {
      console.log("apply");
      store.state.savedFilter = filter.value
      store.state.filter = store.state.savedFilter;
      filter.value={}
    },
    1000
  );
  router.push("/" + store.state.lastViewType);

};

const resetFilter = () => {
  store.state.filter={}
  store.state.savedFilter={}
  filter.value={}
  //store.state.savedFilter = filter;
  //store.state.filter = filter;

};
</script>

<style scoped>
hr {
  margin: 10px 0px 10px;
}
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
