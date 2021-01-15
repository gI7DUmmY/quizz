<template>
  <div class="container">
    <h2 class="center-align">Quizz du règlement</h2>
    <form @submit.prevent="submit" v-if="qcm">
      <h4 class="center-align">Choisissez les réglages</h4>
      <div class="center-align">
      <label>Nombre de Questions</label>
      <input type="number" class="center-align" v-model="qtte" min="1" :max="qcm.length" required>
      </div>

      <button type="submit" class="btn-large">Démarrer</button>
    </form>
    <div v-else>
      <Preloader />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Preloader from '../components/Preloader.vue'

export default {
  name: 'Home',
  components: { 'Preloader': Preloader },
  data: () => ({
    qtte: null,
    qcm: null
  }),
  methods: {
    submit () {
      this.$router.push({ name: 'Questions', params: { qtte: this.qtte }})
    }
  },
  mounted () {
    fetch("http://localhost:3000/quizz")
      .then(res => res.json())
      .then(data => this.qcm = data)
      .catch(err => console.log(err.message))
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