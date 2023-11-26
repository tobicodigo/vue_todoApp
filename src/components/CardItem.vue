<template>
  <div class="content-card">
    <div class="card-big-shadow">
      <div
        class="card card-just-text"
        data-background="color"
        :data-color="activeColor"
        data-radius="none"
        :style="{ backgroundColor: activeColor }"
      >
        <div class="cardHeader">
          
          <toggle
            :checked="task.isDone"
            :checkmark="false"
            @setDone="(i) => (task.isDone = i)"
          ></toggle>
          <router-link :to="'/edit/task/' + task.id">
            <ion-img
              class="editButton"
              src="../../../resources/menu_black_stroke.png"
            ></ion-img>
          </router-link>
        </div>

        <div class="content">
          <h6 class="category">{{ store.state.types[task.type] }}</h6>
          <h4 class="title">{{ task.title }}</h4>
          <p class="description">
            {{ task.description }}
          </p>
          
        </div>
        <div class="dueDate">
          {{ remainingDays }} <span class="dueDate" v-if="remainingDays===1">{{ $t("day") }} </span><span class="dueDate" v-else>{{ $t("days") }}</span>
        <ion-img class="clockImage"
                src="../../../resources/clock_white.png"
              ></ion-img>
              {{ formattedDate }}
      </div>
      </div>

      <!-- end card -->
    </div>
  </div>
</template>

<script setup>
import { IonImg } from "@ionic/vue";
import { ref } from "vue";
import toggle from "./Toggle.vue";
import { useI18n } from "vue-i18n";
import { useStore } from "vuex";
const i18n = useI18n();
const store = useStore();
const props = defineProps(["task"]);
const task = props.task;

const activeColor = ref("var(" + store.state.colors[task.color] + ")");

const dueDateTimeStamp = new Date(task.dueDate).getTime()
const difference = Math.abs(dueDateTimeStamp - (Date.now()));
const remainingDays = Math.ceil(difference / (1000 * 60 * 60 * 24));

const formattedDate = new Date(task.dueDate).toLocaleDateString(i18n.locale.value);

</script>

<style scoped>

h4 {
  font-size:x-large;
  font-weight: bold;
  padding-bottom: 15px;
  padding-top: 20px;
}
.editButton {
  width: 30px;
  height: 30px;
  display: inline-block;
  cursor: pointer;
}

.dueDate {
  position: relative;
  color: white;
  width: 300px;
  padding: 5px 5px 5px 1px;
  text-align: right;
}


.clockImage{
  margin-top:-3px;
  display: inline-block;
  width: 20px;
  vertical-align: middle;
}

.content-card {
  width: 300px;
  display: inline-block;
  margin: 40px;
  max-height: 400px;
}
.card-big-shadow {
  width: 300px;
  position: relative;
}

.coloured-cards .card {
  margin-top: 30px;
}

.card[data-radius="none"] {
  border-radius: 0px;
}
.card {
  border-radius: 8px;
  box-shadow: 0 2px 2px rgba(204, 197, 185, 0.5);
  background-color: #ffffff;
  color: #252422;
  margin-bottom: 20px;
  position: relative;
  z-index: 1;
}

.cardHeader {
  padding-left: 5px;
  padding-top: 5px;
  text-align: right;
}

.card[data-background="image"] .title,
.card[data-background="image"] .stats,
.card[data-background="image"] .category,
.card[data-background="image"] .description,
.card[data-background="image"] .content,
.card[data-background="image"] .card-footer,
.card[data-background="image"] small,
.card[data-background="image"] .content a,
.card[data-background="color"] .title,
.card[data-background="color"] .stats,
.card[data-background="color"] .category,
.card[data-background="color"] .description,
.card[data-background="color"] .content,
.card[data-background="color"] .card-footer,
.card[data-background="color"] small,
.card[data-background="color"] .content a {
  color: #ffffff;
}
.card.card-just-text .content {
  padding: 40px 65px 65px 65px;
  text-align: center;
}
.card .content {
  padding: 20px 20px 10px 20px;
}

.card .category,
.card .label {
  font-size: 14px;
  margin-bottom: 0px;
}
.card-big-shadow:before {
  background-image: url("http://static.tumblr.com/i21wc39/coTmrkw40/shadow.png");
  background-position: center bottom;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  bottom: -12%;
  content: "";
  display: block;
  left: -12%;
  position: absolute;
  right: 0;
  top: 0;
  z-index: 0;
}
h4,
.h4 {
  font-size: 1.5em;
  font-weight: 600;
  line-height: 1.2em;
}
h6,
.h6 {
  font-size: 0.9em;
  font-weight: 600;
  text-transform: uppercase;
}
.card .description {
  font-size: 16px;
  color: #66615b;
}
.content-card {
  margin-top: 30px;
}
a:hover,
a:focus {
  text-decoration: none;
}

/*======== COLORS ===========*/

.card[data-color="var(--yellow)"] .description {
  color: #772510;
}
.card[data-color="var(--yellow)"] .category {
  color: #c7a11a;
}

.card[data-color="var(--blue)"] .description {
  color: #506568;
}
.card[data-color="var(--blue)"] .category {
  color: #506568;
}
.card[data-color="var(--green)"] .description {
  color: #dcf4b8;
}
.card[data-color="var(--green)"] .category {
  color: #c3f059;
}

.card[data-color="var(--orange)"] .description {
  color: #772510;
}
.card[data-color="var(--orange)"] .category {
  color: #e95e37;
}

.card[data-color="var(--pink)"] .description {
  color: #772510;
}
.card[data-color="var(--pink)"] .category {
  color: rgb(248, 204, 252);
}
</style>
