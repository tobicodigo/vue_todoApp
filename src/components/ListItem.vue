<template>
  <li>
    <div class="toggleContainer"><toggle :checked="task.isDone" checkmark="true" @setDone="(i) => task.isDone = i"></toggle></div>

    <div class="content">
      <h2>{{ task.title }}</h2>
      <div class="dueDate">{{ remainingDays }} {{$t('daysLeft')}} | {{ formattedDate }} </div>

      <div class="description">{{ task.description }}</div>
    </div>
    <div class="editContainer">
      <span class="category">{{ store.state.types[task.type] }}</span>
      <span class="color" :style="{ backgroundColor : activeColor }"></span>
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

const dueDateTimeStamp = new Date(task.dueDate).getTime()
const difference = Math.abs(dueDateTimeStamp - (Date.now()));
const remainingDays = Math.ceil(difference / (1000 * 60 * 60 * 24));

const formattedDate = new Date(task.dueDate).toLocaleDateString(i18n.locale.value);

</script>

<style scoped>

h2 {
  font-size:x-large;
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
  margin-right: 10px;
}

h2 {
  margin-top: 30px;
  color: #ad9797;
}

.description {
  padding-top: 10px;
  color: #ad9797;
}

.dueDate {
  display: block;
  color: #97a1ad;
}

li {
  height: 100%;
  min-height: 100px;
  background-color: rgb(255, 255, 255);
  border: 1px solid #f6f2f2;
}
.toggleContainer {
  width: 150px;
  height:100%;

  display:inline;
  background-color: white;
  text-align: center;
  padding-left: 2.1em;
}
.content {
  height: 100%;
  width: 69vw;

  display: inline-block;
  padding-left: 20px;
  padding-right: 20px;
}

.editContainer {
  height:100%;
  width: 300px;

  display: inline-block;
  padding-bottom: 30px;
  padding-top: 20px ;
  text-align: right;
}
</style>
