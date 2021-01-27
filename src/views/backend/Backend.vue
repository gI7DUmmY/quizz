<template>
  <div class="container">
    <h1 class="center-align">Backend</h1>
    <div v-if="qcm.length">
      <div class="input-field">
        <input id="tag" type="text" v-model="search">
        <label for="tag">#Tag</label>
      </div>

      <Tableau :qcm="filtre" :search="search" />
    </div>

    <div v-else>
      <Preloader />
    </div>

    <div v-if="erreur">{{ erreur }}</div>
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

    load()

    return { qcm, erreur, search, filtre }
  }
}
</script>

<style scoped>
.num {
  font-weight: bold;
}
</style>