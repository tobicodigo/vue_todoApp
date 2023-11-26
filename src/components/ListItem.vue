<template>
  <li class="flex flex-wrap justify-content">
    <div class="toggleContainer xl:w-1/12 lg:w-1/6 p-4">
      <toggle
        :checked="task.isDone"
        checkmark="true"
        @setDone="(i) => (task.isDone = i)"
      ></toggle>
    </div>

    <div class="content xl:w-7/12 lg:w-1/2 p-4">
      <h2>{{ task.title }}</h2>
      <div class="dueDate">
        {{ remainingDays }} <span class="dueDate" v-if="remainingDays===1">{{ $t("dayLeft") }} </span><span class="dueDate" v-else>{{ $t("daysLeft") }}</span>
        <ion-img class="clockImage"
                src="../../../resources/clock.png"
              ></ion-img> {{ formattedDate }}
      </div>

      <div class="description">{{ task.description }}</div>
    </div>
    <div class="editContainer xl:w-2/12 sm:w-1/2 lg:w-1/5 p-4">
      <span class="category">{{ store.state.types[task.type] }}</span>
      <span class="color" :style="{ backgroundColor: activeColor }"></span>
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
import { IonButton, IonImg } from "@ionic/vue";
import toggle from "./Toggle.vue";
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import { useStore } from "vuex";
const store = useStore();
const i18n = useI18n();

const props = defineProps(["task"]);
const task = props.task;

const activeColor = ref("var(" + store.state.colors[task.color] + ")");

const dueDateTimeStamp = new Date(task.dueDate).getTime();
const difference = Math.abs(dueDateTimeStamp - Date.now());
const remainingDays = Math.ceil(difference / (1000 * 60 * 60 * 24));

const formattedDate = new Date(task.dueDate).toLocaleDateString(
  i18n.locale.value
);
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
  padding-right:5px;
}

.clockImage{
  margin-top:-3px;
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
  width: fit-content;
}
.content {
  padding-left: 20px;
  padding-right: 20px;
  padding-bottom: 30px;
}

.editContainer {
  width: fit-content;
  padding-bottom: 30px;
  padding-top: 45px;
  text-align: right;
}


</style>
