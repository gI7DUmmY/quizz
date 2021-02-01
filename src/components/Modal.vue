<template>
  <div id="modal1" class="modal">
    <div class="modal-content">
      <h4><slot></slot></h4>
    </div>
    <div class="modal-footer">
      <router-link class="modal-close waves-effect waves-green btn-flat left"
        :to="{ name: 'Backend' }">
        revenir à la liste
      </router-link>
      <button class="modal-close waves-effect waves-green btn-flat right">Continuer</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Modal",
}
</script>

<style scoped>
</style>