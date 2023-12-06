<template>
  <div v-if="$store.state.user.loggedIn" class="form centered">
    <span
      >{{ $t('hello') }} {{ $store.state.user.name
      }}<img
        class="confetti"
        :src="'resources/confetti.gif'"
        alt="Foto de perfil"
    /></span>

    <img
      v-if="$store.state.user.photo"
      class="profile"
      :src="'data:image/jpeg;base64,' + $store.state.user.photo"
      alt="Foto de perfil"
    />
    <h2>{{ props.title }}</h2>
    <router-link v-if="props.showAddbutton" to="/add"
      >
      <hr>
      <custom-button class="smallButton" color="#458FF1">{{
        $t("startAddTask")
      }}</custom-button></router-link
    >
    <slot></slot>
  </div>
</template>

<script setup>
import CustomButton from "../components/CustomButton.vue";
const props = defineProps(["showAddbutton", "title"]);

</script>

<style scoped>

hr {
  margin: 10px 0px 20px;
}



.profile {
  border-radius: 50%;
  overflow: hidden;
  width: 100px;
  height: 100px;
  margin: 20px auto;
}
</style>
