<template>
  <div class="container">
    <h2 class="center-align">Quizz du règlement</h2>
    <form @submit.prevent="submit" v-if="!loading">
      <h4 class="center-align">Choisissez les réglages</h4>
      <div class="center-align">
      <label>Nombre de Questions (de 1 à {{ qcm.length }})</label>
      <input type="number" class="center-align" v-model="qtte" min="1" :max="qcm.length" required>
      <input type="range" step="1" v-model="qtte" min="1" :max="qcm.length">
      </div>

      <div class="row center-align">
        <button type="submit" class="btn-large">
          <i class="material-icons left">play_arrow</i>Démarrer
        </button>
      </div>
    </form>
    <div v-else>
      <Preloader />
    </div>
    <div v-if="erreur">{{ erreur }}</div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import Preloader from '../components/Preloader.vue'
import GetQcm from '../composables/GetQcm'

export default {
  name: 'Home',
  components: { 'Preloader': Preloader },
  setup () {
    const { qcm, erreur, load } = GetQcm()
    const qtte = ref(1)
    const router = useRouter()
    const loading = ref(true)

    const num = computed (() => {
      return Math.round(qtte.value)
    })
    const submit = () => {
      router.push({ name: 'Questions2', params: { qtte: num.value }})
    }

    load().then(() => loading.value = false)

    return { qcm, erreur, qtte, num, submit, loading }
  }
}
</script>

<style scoped>
form {
  max-width: 400px;
  margin: 5em auto;
}
label {
  display: block;
  margin-bottom: 1em;
}
#nombre {
  font-size: 1.5em;
}
input[type="number"] {
  display: block;
  width: 3em;
  margin: 0 auto 1em auto;
}
button[type="submit"] {
  margin-top: 2em;
}
</style>