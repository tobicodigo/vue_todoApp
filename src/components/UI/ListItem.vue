<template>
  <li>
    <div class="inputSpan"><toggle :checked="task.isDone" /></div>

    <div class="content">
      <h2>{{ task.title }}</h2>
      <span class="description">{{ task.description }}</span>
    </div>
    <div class="editSpan">
      <span class="category">{{ store.state.categories[task.category] }}</span>
      <span class="color" :style="{ backgroundColor: activeColor }"></span>
      <span class="editButton">
        <ion-button href="/edit" fill="clear"
          ><ion-img
            class="editButton"
            src="../../../resources/menu.png"
          ></ion-img
        ></ion-button>
      </span>
    </div>
  </li>
</template>

<script setup>
import { IonButton, IonImg } from "@ionic/vue";
import toggle from "./Toggle.vue";
import { ref } from "vue";
import { useStore } from "vuex";
const store = useStore();
const props = defineProps(["task"]);
const task = props.task;

const activeColor = ref("var(" + store.state.colors[task.color] + ")");
</script>

<style scoped>
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
  color: #ad9797;
}

li {
  height: 100%;
  min-height: 100px;
  background-color: rgb(255, 255, 255);
  border: 1px solid #f6f2f2;
}
.inputSpan {
  height: 100%;
  width: 10%;
  flex-grow: 0;
  display: inline-block;
  background-color: white;
  text-align: center;
  padding-left: 2.1em;
}
.content {
  height: 100%;
  width: 50%;
  flex-grow: 0;
  display: inline-block;
  padding-left: 20px;
  padding-right: 20px;
}

.editSpan {
  height: 50%;
  width: 40%;
  flex-grow: 0;
  display: inline-block;
  text-align: right;
  padding-bottom: 30px;
  padding-top: 20px ;
}
</style>
