<template>
  <h1>Voici vos {{ qtte }} questions</h1>
  <div v-if="qcm">
    <form @submit.prevent="score">
      <div v-for="(question, index) in randQuizz" :key="index">
          <p v-show="current === index">
            Question #{{ index + 1 }} :<br />
            {{ question.sujet }}
            <ul>
              <li v-for="reponse in question.choix" :key="reponse.id">
                <label :for="reponse.id">{{ reponse.texte }}</label>
                <input type="checkbox" :value="reponse" v-model="valeurs">
              </li>
            </ul>
            <button type="button" @click="prev" :disabled="current === 0">Précédent</button>
            <button type="button" @click="next" :disabled="current === qtte-1">Suivant</button>
          </p>
      </div>
      <div><button type="submit">Résultat</button></div>
    </form>
  </div>
</template>

<script>

export default {
  name: 'Questions',
  props: ['qtte'],
  data: () => ({
    qcm: null,
    randQuizz: [],
    valeurs: [],
    resultat: 0,
    current: 0
  }),
  methods: {
    score () {
      if (this.valeurs) {
        this.valeurs.forEach(element => {
          this.resultat += element.note
        });
      }
      console.log('Votre score est de ' + this.resultat)
      this.resultat = 0
    },
    prev () {
      if (this.valeurs && this.current > 0) {
        this.current --
        this.valeurs.forEach(element => {
          this.resultat += element.note
        });
      }
      this.resultat = 0
    },
    next () {
      if (this.valeurs && this.current < this.qtte-1) {
        this.current ++
        this.valeurs.forEach(element => {
          this.resultat += element.note
        });
      }
      this.resultat = 0
    }
  },
  mounted () {
    fetch("http://localhost:3000/quizz")
      .then(res => res.json())
      .then(data => {
        this.qcm = data
        let i = 0
        let random = Math.floor(Math.random() * Math.floor(this.qcm.length))

        do {
          if(!this.randQuizz.includes(this.qcm[random])) {
            this.randQuizz.push(this.qcm[random])
            i++
          }
          random = Math.floor(Math.random() * Math.floor(this.qcm.length))
        } while (i < this.qtte)
      })
      .catch(err => console.log(err.message))
  }
}
</script>

<style>
ul {
  list-style: none;
}
</style>