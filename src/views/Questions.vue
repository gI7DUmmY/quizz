<template>
  <div class="container">
    <h2 class="center-align">Quizz du règlement</h2>
    <div v-if="qcm" class="row">
      <form @submit.prevent="score" @reset.prevent="rejouer" class="col s12">
        <div v-if="joue">
          <div v-for="(question, index) in randQuizz" :key="index">
              <div v-show="current === index" class="card-panel blue lighten-4">
                <h4>Question {{ index + 1 }} de {{ qtte }} :</h4>
                <div class="divider teal accent-4"></div>

                <p class="blue-grey-text text-lighten-2">#{{ question.id }}</p>
                <p class="sujet">{{ question.sujet }}</p>

                <p v-for="reponse in question.choix" :key="reponse.id">
                  <label>
                    <input type="checkbox" class="filled-in" :id="reponse.id" :value="reponse" v-model="valeurs"/>
                    <span class="black-text reponse" :for="reponse.id">{{ reponse.texte }}</span>
                  </label>
                </p>
                <div class="divider teal accent-4"></div>

                <div id=flex>
                  <div>
                    <a
                      id="btn-prev"
                      @click="prev"
                      :class="{ disabled: current === 0 }"
                      class="waves-effect waves-light btn-small btn-flat blue lighten-3"
                    >
                      <i class="material-icons left">chevron_left</i>Préc.
                    </a>
                  </div>

                  <div>
                    <a
                      id="btn-next"
                      @click="next"
                      :class="{ disabled: current === qtte-1 }"
                      class="waves-effect waves-light btn-small btn-flat blue lighten-3"
                    >
                      <i class="material-icons right">chevron_right</i>Suiv.
                    </a>
                  </div>
                </div>
              </div>
          </div>
          <button v-if="showSubmit || qtte == 1" type="submit" class="btn-large">
            <i class="material-icons left">school</i>Résultat
          </button>
        </div>

        <div v-else>
          <Resultat :resultat="resultat" :total="total" :pourcentage="pourcentage" />
          <button type="reset" class="btn-large">
            <i class="material-icons left">replay</i>Rejouer
          </button>
        </div>
      </form>
    </div>

    <div v-else>
      <Preloader />
    </div>
    <div v-if="erreur">{{ erreur }}</div>
  </div>
</template>

<script>
import Preloader from '../components/Preloader.vue'
import Resultat from '../components/Resultat.vue'
import GetQcm from '../composables/GetQcm'

export default {
  name: 'Questions',
  props: [ 'qtte' ],
  components: {
    'Preloader': Preloader,
    'Resultat': Resultat
  },
  data: () => ({
    qcm: null,
    randQuizz: [],
    valeurs: [],
    resultat: 0,
    pourcentage: 0,
    current: 0,
    joue: true,
    showSubmit: false,
    erreur: null
  }),
  methods: {
    score () {
      if (this.valeurs) {
        this.valeurs.forEach(element => {
          this.resultat += element.note
        });
        if (this.resultat < 0) this.resultat = 0
        this.pourcentage = Math.round(this.resultat * 100 / this.total)
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

      if (this.current === this.qtte - 1) this.showSubmit = true
      this.resultat = 0
    }
  },
  mounted () {
    const { qcm, erreur, load } = GetQcm()
    load().then(() => {
      this.qcm = qcm
      this.erreur = erreur

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

<style scoped>
.sujet {
  font-weight: 350;
  font-size: 1.5em;
}
form ul {
  font-size: 1.5em;
}
#flex {
  margin-top: 1em;
  display: flex;
  justify-content: space-around;
}
button[type="submit"], button[type="reset"] {
  display: block;
  margin-top: 2em;
  margin-right: auto;
  margin-left: auto;
}
</style>