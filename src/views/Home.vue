<template>
  <h1>Quizz du règlement</h1>
  <form @submit.prevent="submit" v-if="qcm">
    <h2>Choisissez les réglages</h2>
    <label for="nbQuestions">Nombre de Questions</label>
    <input type="number" v-model="qtte" :max="qcm.length" required>

    <button type="submit">Démarrer</button>
  </form>
  <p v-if="qtte">Vous avez choisi {{ qtte }} questions</p>
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
