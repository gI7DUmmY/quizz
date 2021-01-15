<template>
  <div class="divider"></div>
  <h4 class="center-align">Votre score est de</h4>
  <h3 class="center-align blue-text text-lighten-2">
    {{ resultat }} sur {{ total }} ({{ pourcentage }}%)
  </h3>
</template>

<script>
export default {
  props: ['resultat', 'total', 'pourcentage']
};
</script>

<style>
</style>