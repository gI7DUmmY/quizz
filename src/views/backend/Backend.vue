<template>
  <div class="container">
    <div>
      <button
        class="btn-small"
        @click="deconnecter"
        v-if="user"
      >Déconnecter {{ user.email }}
      </button>
      <div>{{ logoutError }}</div>
    </div>
    <h1 class="center-align">Backend</h1>
    <router-link :to="{ name: 'NewQuestion' }" class="btn-small">
      <i class="material-icons left">add</i>Question
    </router-link>
    <div v-if="!loading && qcm.length > 0" class="search">
      <div class="input-field">
        <i class="material-icons prefix">search</i>
        <input id="tag" type="text" placeholder="#Tag" v-model="search">
      </div>

      <Tableau :qcm="filtre" :search="search" @searchTag="searchTag" />
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
      @click="scrollTop"
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
import useLogout from '../../composables/useLogout'
import getUser from '../../composables/getUser'

export default {
  name: 'Backend',
  components: { Tableau, Preloader },
  setup () {
    const { qcm, erreur, load } = GetQcm()
    const { logoutError, logout } = useLogout()
    const { user } = getUser()
    const search = ref('')
    const loading = ref(true)

    const scrollTop = () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    }

    const searchTag = (tag) => search.value = tag

    const deconnecter = async () => {
      await logout()

      if (!logoutError.value) console.log('Déconnexion OK')
    }

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

    return { qcm, erreur, loading, search, filtre, scrollTop, searchTag, deconnecter, logoutError, user }
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