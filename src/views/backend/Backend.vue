<template>
  <div id="titre" class="container">
    <h1 class="center-align">Backend</h1>
    <router-link :to="{ name: 'NewQuestion' }" class="btn-small">
      <i class="material-icons left">add</i>Question
    </router-link>
    <div v-if="!loading && qcm.length > 0" class="search">
      <div class="input-field">
        <i class="material-icons prefix">search</i>
        <input id="tag" type="text" placeholder="#Tag" v-model="search">
      </div>

      <Tableau :qcm="filtre" :search="search" />
    </div>

    <div v-if="loading">
      <Preloader />
    </div>

    <h4 v-if="qcm.length === 0" class="center-align">Il n'y a pas encore de question !</h4>

    <div v-if="erreur">{{ erreur }}</div>
  
  </div>

  <div id="goTop">
    <a
      class="btn-floating btn waves-effect waves-light blue right"
      href="#titre"
    >
      <i class="material-icons">arrow_upward</i>
    </a>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import GetQcm from '@/composables/GetQcm'
import Tableau from  '@/components/Tableau.vue'
import Preloader from '@/components/Preloader.vue'

export default {
  name: 'Backend',
  components: { Tableau, Preloader },
  setup () {
    const { qcm, erreur, load } = GetQcm()
    const search = ref('')
    const loading = ref(true)

    const filtre = computed(() => {
      let lesTags = ''

      if (!search.value) return qcm.value
      else {
        return qcm.value.filter(q => {
          q.tags.forEach(tag => {
            lesTags += tag
          })
          if (lesTags.includes(search.value)) {
            lesTags = ''
            return true
          }
          else return false
        })
      }
    })

    load().then(() => loading.value = false)

    return { qcm, erreur, loading, search, filtre }
  }
}
</script>

<style scoped>
.container {
  margin-bottom: 5em;
}
h4 {
  margin-top: 3em;
}
.search {
  margin-top: 1.5em;
}
#goTop {
  position: fixed;
  bottom: 1em;
  right: 1em;
}
</style>