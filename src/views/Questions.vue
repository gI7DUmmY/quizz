<template>
  <div class="container">
    <h1 class="center-align">Quizz du règlement</h1>
    <div v-if="qcm">
      <form @submit.prevent="score" @reset.prevent="rejouer">
        <div v-if="joue">
          <div v-for="(question, index) in randQuizz" :key="index">
              <div v-show="current === index">
                <h3>Question {{ index + 1 }} de {{ qtte }} :</h3>

                <p class="sujet">{{ question.sujet }}</p>

                <p v-for="reponse in question.choix" :key="reponse.id">
                  <label>
                    <input type="checkbox" :value="reponse" v-model="valeurs"/>
                    <span :for="reponse.id">{{ reponse.texte }}</span>
                  </label>
                </p>

                <a
                  @click="prev"
                  :class="{ disabled: current === 0 }"
                  class="waves-effect waves-light btn-small btn-flat"
                >
                  <i class="material-icons left">chevron_left</i>Précédent
                </a>
                <a
                  @click="next"
                  :class="{ disabled: current === qtte-1 }"
                  class="waves-effect waves-light btn-small btn-flat"
                >
                  <i class="material-icons right">chevron_right</i>Suivant
                </a>
              </div>
          </div>
          <button type="submit" class="btn">Résultat</button>
        </div>
        <div v-if="joue === false">
          <h3>
            Votre score est de<br /><span>{{ resultat }} sur {{ total }} ({{ pourcentage }}%)</span>
          </h3>
          <button type="reset" class="btn">Rejouer</button>
        </div>
      </form>
    </div>
    <div v-else>
      <Preloader />
    </div>
  </div>
</template>

<script>
import Preloader from '../components/Preloader.vue'

export default {
  name: 'Questions',
  props: [ 'qtte' ],
  components: { 'Preloader': Preloader },
  data: () => ({
    qcm: null,
    randQuizz: [],
    valeurs: [],
    resultat: 0,
    pourcentage: 0,
    current: 0,
    joue: true
  }),
  methods: {
    score () {
      if (this.valeurs) {
        this.valeurs.forEach(element => {
          this.resultat += element.note
        });
        this.pourcentage = this.resultat * 100 / this.total
      }
      this.joue = false
    },
    rejouer () {
      this.$router.push({ name: "Home" })
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
  },
  computed: {
    total () {
      let total = 0
      this.randQuizz.forEach(question => {
        question.choix.forEach(reponse => {
          if (reponse.note > 0) total += reponse.note
        })
      })
      return total
    }
  }
}
</script>

<style>
.sujet {
  font-weight: bold;
  font-size: 1.5em;
}
form ul {
  font-size: 1.5em;
}
button[type="submit"], button[type="reset"] {
  margin-top: 2em;
}
</style>