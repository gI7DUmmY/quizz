<template>
  <div class="container center-align">
    <div class="row">
      <div class="col s12"><h3 class="">La page que vous avez demandée est introuvable</h3></div>
      <div class="col s12">
        <router-link :to="{ name: 'Home' }" class="btn-small">
          <i class="material-icons left">home</i>Retour à l'accueil
        </router-link>
      </div>
      <div class="col s12"><img src="@/assets/notFound.svg" alt="404_svg" class="responsive-img" /></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "NotFound",
};
</script>

<style scoped>
h3 {
  font-family: "Fraud", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
  text-transform: uppercase;
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