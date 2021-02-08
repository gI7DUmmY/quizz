<template>
<div class="container">
  <div v-if="!loading">
    <h3 class="center-align">Ajouter une nouvelle question</h3>
    <form ref="form" @submit.prevent="save" class="col s12">
      <div class="row">
        <div class="input-field col s12" id="sujet">
          <div class="entete">Sujet :</div>
          <textarea required v-model="question.sujet" id="sujet" class="materialize-textarea"></textarea>
        </div>
      </div>

      <div class="row">
        <div class="entete">Les choix :</div>
        <div class="row grey-text text-lighten-1" id="colonne">
          <span class="col s7">texte</span>
          <span class="col s1 offset-s1">note</span>
        </div>
        <div v-for="(rep, index) in question.choix" :key="index" class="input-field col s12">
          <div class="row">
            <input type="text" required v-model="rep.texte" class="col s7" @keydown.enter.prevent="">
            <input type="number" required v-model="rep.note" step="1" class="col s1 offset-s1" @keydown.enter.prevent="">
            <button
              class="btn-floating corbeille btn-small red"
              @click.prevent="remChoice(rep.id)"
              :class="{ disabled: question.choix.length < 3 }"
            >
              <i class="material-icons">remove_circle_outline</i>
            </button>
          </div>
        </div>
        <button class="btn-floating btn-small" @click.prevent="addChoice">
          <i class="material-icons">add</i>
        </button>

      </div>
      <Tags id="tags" :tags="question.tags" @addTag="addTag" @remTag="remTag" />

      <div class="row actions">
        <button type="submit" class="btn col s6 offset-s3 m4 offset-m4">
          <i class="material-icons left">save</i>Enregistrer
        </button>
      </div>
    </form>
  </div>
  <div v-else>
    <Preloader>Sauvegarde en cours...</Preloader>
  </div>

  <div v-if="erreur">
    <h4 class="red-text center-align">{{ erreur }}</h4>
  </div>

  <Modal :id="'std'" :type="'save'">Question Ajoutée</Modal>
</div>
</template>

<script>
import { onMounted, ref } from 'vue'
import Tags from '@/components/Tags.vue'
import Preloader from '@/components/Preloader.vue'
import Modal from '@/components/Modal.vue'
import openModal from '@/composables/openModal'
import { db } from '../../firebase/config'

export default {
name: 'NewQuestion',
components: { Tags, Preloader, Modal },
setup () {
  const question = ref({
    sujet: '',
    choix: [
      { id: 0, texte: '', note: null },
      { id: 1, texte: '', note: null }
    ],
    tags: []
  })

  const loading = ref(false)
  const erreur = ref(null)

  const addChoice = () => {
    const uid = new Date
    const newChoice = { id: Date.now(uid), texte: 'Nouveau choix', note: 0 }
    question.value.choix.push(newChoice)
  }

  const remChoice = (id) => {
    if (question.value.choix.length > 2) question.value.choix = question.value.choix.filter(el => el.id !== id)
  }

  const addTag = (newTag) => {
    if (!question.value.tags.includes(newTag)) {
      newTag = newTag.replace(/\s/g,'') // remove all whitespace
      question.value.tags.push(newTag)
    }
  }

  const remTag = (tag) => {
    question.value.tags = question.value.tags.filter(el => el !== tag)
  }

  const save = async () => {
    let lignes = []
    let sujet = ''
    loading.value = true
    question.value.choix.forEach(rep => {
      rep.note = parseInt(rep.note)
    })
    lignes = question.value.sujet.split('\n')
    lignes.forEach(el => sujet += '\n' + el)
    question.value.sujet = sujet.trim()

    await db.collection('quizz').add(question.value)

    loading.value = false
    openModal('std')
    question.value = {
      sujet: '',
      choix: [
        { id: 0, texte: '', note: null },
        { id: 1, texte: '', note: null }
      ],
      tags: []
    }
  }

  onMounted(() => {
    const elems = document.querySelectorAll('.modal');
    M.Modal.init(elems);
  })

  return { question, addChoice, remChoice, save, loading, erreur, addTag, remTag }
}
}
</script>

<style scoped>
#sujet {
  padding: 0px;
}
.entete {
  margin-bottom: 0px;
  font-weight: bold;
}
#colonne {
  margin-top: 1em;
  margin-bottom: 0px;
}
.corbeille {
  margin-left: 3em;
}
#tags {
  margin-top: 1.5em;
}
.input-field {
  margin-top: 0px;
}
.actions button {
  margin-top: 2em;
}
</style>