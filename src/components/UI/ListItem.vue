<template>
  <li>
    <div class="inputSpan"><input type="checkbox" :id="task.id" /></div>
    <div class="content">
      <label :for="task.id">
        <h2>{{ task.title }}</h2>
        <span class="description">{{ task.description }}</span>
      </label>
    </div>
    <div class="editSpan">
      <span class="category">{{ store.state.categories[task.category] }}</span>
      <span class="color" :style="{ backgroundColor: activeColor, fontSize: fontSize + 'px' }"></span> 
      <span class="editButton">
      <ion-button href="/edit" fill="clear"><ion-img class="editButton" src="../../../resources/menu.png"></ion-img></ion-button>
      </span>
    </div>
  </li>
</template>

<script setup>
import { ref } from "vue";
import { useStore } from "vuex";
const store = useStore();
const props = defineProps(["task"]);
const task = props.task;

const activeColor = ref(store.state.colors[task.color])
const fontSize = ref(30)


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
  width: 50px;
  height: 50px;
  margin-right: 10px;
  padding: 5px;
}



h2 {
  color: #ad9797;
}

.description {
  color: #ad9797;
}

li {
  background-color: rgb(255, 255, 255);
  border: 1px solid #f6f2f2;
}
.inputSpan {
  height: 100%;
  width: 5%;
  flex-grow: 0;
  display: inline-block;
  padding-top: 50px;
  padding-bottom: 50px;
  background-color: white;
  text-align: center;
}
.content {
  height: 100%;
  width: 60%;
  flex-grow: 0;
  display: inline-block;
  padding: 20px 10px 10px 10px;
}

.editSpan {
  height: 100%;
  width: 35%;
  flex-grow: 0;
  display: inline-block;
  text-align: right;
}

h2 {
  margin-top: 0px;
}
</style>
