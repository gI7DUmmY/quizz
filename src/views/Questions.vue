<template>
  <div class="container">
    <h2 class="center-align">Quizz du règlement</h2>

    <div v-if="!loading" class="row">
      <form @submit.prevent="score" @reset.prevent="rejouer" class="col s12">
        <div v-if="joue">
          <div v-for="(question, index) in randQuizz" :key="question.id">
            <div v-show="current === index" class="card-panel blue lighten-4">
              <h4>
                Question
                <span id="nbQuestion">{{ index + 1 }} de {{ qtte }} :</span>
              </h4>
              <div class="divider teal accent-4"></div>

              <p class="blue-grey-text text-lighten-2">#{{ question.id }}</p>
              <p class="sujet">{{ question.sujet }}</p>

              <p v-for="reponse in question.choix" :key="reponse.id">
                <label>
                  <input
                    type="checkbox"
                    class="filled-in"
                    :id="reponse.id"
                    :value="reponse"
                    v-model="valeurs"
                  />
                  <span class="black-text reponse" :for="reponse.id">{{
                    reponse.texte
                  }}</span>
                </label>
              </p>
              <div class="divider teal accent-4"></div>

              <div id="flex">
                <div>
                  <a
                    id="btn-prev"
                    @click="prev"
                    :class="{ disabled: current === 0 }"
                    class="
                      waves-effect waves-light
                      btn-small btn-flat
                      blue
                      lighten-3
                    "
                  >
                    <i class="material-icons left">chevron_left</i>Préc.
                  </a>
                </div>

                <div>
                  <a
                    id="btn-next"
                    @click="next"
                    :class="{ disabled: current === qtte - 1 }"
                    class="
                      waves-effect waves-light
                      btn-small btn-flat
                      blue
                      lighten-3
                    "
                  >
                    <i class="material-icons right">chevron_right</i>Suiv.
                  </a>
                </div>
              </div>
            </div>
          </div>
          <button
            v-if="showSubmit || qtte == 1"
            type="submit"
            class="btn-large"
          >
            <i class="material-icons left">school</i>Résultat
          </button>
        </div>

        <div v-else>
          <Resultat
            :resultat="resultat"
            :total="total"
            :pourcentage="pourcentage"
          />
          <button type="reset" class="btn-large">
            <i class="material-icons left">replay</i>Rejouer
          </button>
        </div>
      </form>
    </div>

    <div v-else><Preloader /></div>

    <div v-if="erreur">{{ erreur }}</div>
  </div>
</template>

<script>
import { computed, ref, watch } from "vue";
import Preloader from "../components/Preloader.vue";
import Resultat from "../components/Resultat.vue";
import GetQcm from "../composables/GetQcm";
import { useRouter } from "vue-router";

export default {
  name: "Questions2",
  props: ["qtte"],
  components: {
    Preloader: Preloader,
    Resultat: Resultat,
  },
  setup(props) {
    const { qcm, erreur, load } = GetQcm();
    const loading = ref(true);
    const joue = ref(true);
    const randQuizz = ref([]);
    const current = ref(0);
    const valeurs = ref([]);
    const resultat = ref(0);
    const showSubmit = ref(false);
    const pourcentage = ref(0);
    const router = useRouter();

    const total = computed(() => {
      let total = 0;
      randQuizz.value.forEach((question) => {
        question.choix.forEach((reponse) => {
          if (reponse.note > 0) total += reponse.note;
        });
      });
      return total;
    });

    const prev = () => {
      if (current.value > 0) {
        current.value--;
        valeurs.value.forEach((element) => {
          resultat.value += element.note;
        });
      }
      resultat.value = 0;
    };

    const next = () => {
      if (current.value < props.qtte - 1) {
        current.value++;
        valeurs.value.forEach((element) => {
          resultat.value += element.note;
        });
      }

      if (current.value === props.qtte - 1) showSubmit.value = true;
      resultat.value = 0;
    };

    const score = () => {
      if (valeurs.value) {
        valeurs.value.forEach((element) => {
          resultat.value += element.note;
        });
        if (resultat.value < 0) resultat.value = 0;
        pourcentage.value = Math.round((resultat.value * 100) / total.value);
      }
      joue.value = false;
    };

    const rejouer = () => router.push({ name: "Home" });

    load();

    watch(qcm, () => {
      let i = 0;
      let random = Math.floor(Math.random() * Math.floor(qcm.value.length));

      do {
        if (!randQuizz.value.includes(qcm.value[random])) {
          randQuizz.value.push(qcm.value[random]);
          i++;
        }
        random = Math.floor(Math.random() * Math.floor(qcm.value.length));
      } while (i < props.qtte);
      loading.value = false;
    });

    return {
      qcm,
      erreur,
      loading,
      joue,
      score,
      randQuizz,
      current,
      prev,
      next,
      showSubmit,
      pourcentage,
      total,
      resultat,
      rejouer,
      valeurs,
    };
  },
};
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
button[type="submit"],
button[type="reset"] {
  display: block;
  margin-top: 2em;
  margin-right: auto;
  margin-left: auto;
}
#nbQuestion {
  display: inline-block;
}
</style>