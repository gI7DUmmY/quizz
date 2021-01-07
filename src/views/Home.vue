<template>
  <div class="container">
    <h1 class="center-align">Quizz du règlement</h1>
    <form @submit.prevent="submit" v-if="qcm">
      <h4>Choisissez les réglages</h4>
      <label>Nombre de Questions</label>
      <input type="number" v-model="qtte" min="1" :max="qcm.length" required>

      <p v-if="qtte">Vous avez choisi {{ qtte }} question(s) au hasard</p>
      <button type="submit" class="btn">Démarrer</button>
    </form>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home',
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

<style>
form {
  max-width: 400px;
  margin: 5em auto;
}
</style>