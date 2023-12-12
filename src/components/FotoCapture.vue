<template>
      <label for="photo">{{ $t("picture") }}</label>
      <img id="profile" :src="imageUrl" alt="Foto de perfil" />
      <input type="file" id="photo" v-on:change="onFileChanged" style="display: none;" />
<input type="button" :value="$t('browseFoto')" onclick="document.getElementById('photo').click();" />
 
</template>

<script setup>
import {ref,onMounted} from "vue"

const props = defineProps(["base64"]);
const imageUrl = ref('resources/profile_animated.gif');

const emit = defineEmits(['on-selected']);

onMounted(() => {
  if(props.base64) {
    imageUrl.value='data:image/jpeg;base64,'+props.base64
  }
});


const onFileChanged = (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      imageUrl.value = e.target.result;
      const base64Data = imageUrl.value.split(",")[1];
      emit('on-selected', base64Data);
    };
    reader.readAsDataURL(file);
  }
};

</script>


<style scoped>
#profile {
    border-radius: 50%;
    overflow: hidden;
    width: 80px;
    height:80px;
    margin: 0 auto;
    
}
label {
  display: block;
  font-weight: bold;
  width: 100%;
}
</style>
