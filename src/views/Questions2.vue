<template>
  <div class="container">
    <h2 class="center-align">Quizz du règlement</h2>
    <!-- <div v-if="!loading" class="row">
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
    </div> -->

    <div v-if="!loading" class="row">
      <form @submit.prevent="score" class="col s12"></form>
    </div>

    <div v-else>
      <Preloader />
    </div>
    <div v-if="erreur">{{ erreur }}</div>
  </div>
</template>

<script>
import { ref } from 'vue'
import Preloader from '../components/Preloader.vue'
import Resultat from '../components/Resultat.vue'
import GetQcm from '../composables/GetQcm'

export default {
  name: 'Questions2',
  props: [ 'qtte' ],
  components: {
    'Preloader': Preloader,
    'Resultat': Resultat
  },
  setup () {
    const { qcm, erreur, load } = GetQcm()
    const loading = ref(true)
    const joue = ref(true)

    const score = () => {}

    load().then(() => loading.value = false)

    return { qcm, erreur, loading, joue, score }
  }
}
</script>

<style>

</style>