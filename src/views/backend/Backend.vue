<template>
  <div class="container">
    <h1 class="center-align">Backend</h1>
    <div v-if="qcm.length">
      <div class="input-field">
        <input id="tag" type="text" v-model="search">
        <label for="tag">#Tag</label>
      </div>

      <Tableau :qcm="filtre" />
    </div>

    <div v-else>
      <Preloader />
    </div>

    <div v-if="erreur">{{ erreur }}</div>
  </div>
</template>

<script>
import { ref } from 'vue'
import GetQcm from '@/composables/GetQcm'
import Tableau from  '@/components/Tableau.vue'
import Preloader from '@/components/Preloader.vue'

export default {
  name: 'Backend',
  components: { Tableau, Preloader },
  setup () {
    const { qcm, erreur, load } = GetQcm()
    const search = ref('')

    load()

    return { qcm, erreur, search }
  },
  computed: {
    filtre () {
      let lesTags = ''
      
      if (this.search.length === 0) return this.qcm
      else {
        return this.qcm.filter(q => {
          q.tags.forEach(tag => {
            lesTags += tag
          })
          if (lesTags.includes(this.search)) {
            lesTags = ''
            return true
          }
          else return false
        })
      }
    }
  }
}
</script>

<style scoped>
.num {
  font-weight: bold;
}
.tag{
  display: inline-block;
}
</style>