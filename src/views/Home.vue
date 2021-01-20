<template>
  <div class="container">
    <h2 class="center-align">Quizz du règlement</h2>
    <form @submit.prevent="submit" v-if="qcm">
      <h4 class="center-align">Choisissez les réglages</h4>
      <div class="center-align">
      <label>Nombre de Questions (de 1 à {{ qcm.length }})</label>
      <input type="number" class="center-align" v-model="qtte" min="1" :max="qcm.length" required>
      </div>

      <button type="submit" class="btn-large">Démarrer</button>
    </form>
    <div v-else>
      <Preloader />
    </div>
    <div v-if="erreur">{{ erreur }}</div>
  </div>
</template>

<script>
import { ref } from 'vue'
import Preloader from '../components/Preloader.vue'
import GetQcm from '../composables/GetQcm'

export default {
  name: 'Home',
  components: { 'Preloader': Preloader },
  methods: {
    submit () {
      this.$router.push({ name: 'Questions', params: { qtte: this.qtte }})
    }
  },
  setup () {
    const { qcm, erreur, load } = GetQcm()
    const qtte = ref(null)

    load()

    return { qcm, erreur, qtte }
  }
}
</script>

<style scoped>
form {
  max-width: 400px;
  margin: 5em auto;
}
input[type="number"] {
  display: block;
  width: 100px;
  margin: 0 auto;
}
</style>