<template>
  <div class="container center-align">
    <h1 class="flow-text">La page que vous avez demandée est introuvable</h1>
    <router-link :to="{ name: 'Home' }" class="btn-small">
      <i class="material-icons left">home</i>Retour à l'accueil
    </router-link>
    <img src="@/assets/notFound.svg" alt="404_svg" class="responsive-img" />
  </div>
</template>

<script>
export default {
  name: "NotFound",
};
</script>

<style>
h1 {
  font-family: "Fraud", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
}
.btn-small {
  background-color: #6c63ff;
}
.btn-small:hover {
  background-color: #2196f3;
}
img {
  margin-top: 3em;
}
</style>