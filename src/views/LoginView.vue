<template>
  <div>
  <form>
    <router-link to="/register">{{ $t("registerProfile") }}</router-link>
    <br /><br />
    <router-link to="/password">{{ $t("forgotPassword") }}</router-link>
  </form>
</div>
</template>

<style scoped>
form {
  color: rgb(103, 103, 103);
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 500px;
  margin: 50px auto;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}
</style>
