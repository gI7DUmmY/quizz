<template>
<div class="container">
  <div v-if="question">
    <h3 class="center-align">Détails de la question {{ id }}</h3>
    <form @submit.prevent="save" class="col s12">
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
        <button class="btn red col s6 offset-s3 m3 offset-m2" @click.prevent="confirmSuppr">
          <i class="material-icons left">delete_forever</i>Effacer
        </button>
        <button type="submit" class="btn col s6 offset-s3 m3 offset-m2">
          <i class="material-icons left">save</i>Enregistrer
        </button>
      </div>
    </form>
  </div>

  <div v-if="erreur">
    <h4 class="red-text center-align">{{ erreur }}</h4>
  </div>

  <Modal :id="'std'" :type="typeModal" @suppr="suppr">{{ titreModal }}</Modal>
  <Modal :id="'suppr'" :type="typeModal">{{ titreModal }}</Modal>
</div>
</template>

<script>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import GetQuestion from '@/composables/GetQuestion'
import Tags from '@/components/Tags.vue'
import Modal from  '@/components/Modal.vue'
import openModal from '@/composables/openModal'
import { db } from '../../firebase/config'

export default {
  name: 'Details',
  props: [ 'id' ],
  components: { Tags, Modal },
  setup (props) {
    const { question, erreur, load } = GetQuestion(props.id)
    const titreModal = ref(null)
    const typeModal = ref(null)
    const router = new useRouter

    const addTag = (newTag) => {
      if (!question.value.tags.includes(newTag)) {
        newTag = newTag.replace(/\s/g,'') // remove all whitespace
        question.value.tags.push(newTag)
      }
    }

    const remTag = (tag) => {
      question.value.tags = question.value.tags.filter(el => el !== tag)
    }

    const addChoice = () => {
      const uid = new Date
      const newChoice = { id: Date.now(uid), texte: 'Nouveau choix', note: 0 }
      question.value.choix.push(newChoice)
    }

    const remChoice = (id) => {
      if (question.value.choix.length > 2) question.value.choix = question.value.choix.filter(el => el.id !== id)
    }

    const save = async () => {
      let lignes = []
      let sujet = ''
      titreModal.value = 'Modifications Enregistrées'
      typeModal.value = 'save'
      question.value.choix.forEach(rep => {
        rep.note = parseInt(rep.note)
      })
      lignes = question.value.sujet.split('\n')
      lignes.forEach(el => sujet += '\n' + el)
      sujet = sujet.trim()

      const data = {
        sujet: sujet,
        choix: question.value.choix,
        tags: question.value.tags
      }

      await db.collection('quizz').doc(props.id).set(data)

      openModal('std')
    }

    const confirmSuppr = () => {
      titreModal.value = 'Supprimer la question ?'
      typeModal.value = 'confirmSuppr'
      openModal('std')
    }

    const suppr = async () => {
      titreModal.value = 'Question supprimée'
      typeModal.value = 'suppr'

      await db.collection('quizz').doc(props.id).delete()

      setTimeout(() => openModal('suppr'), 500)
    }

    load()

    onMounted (() => {
      const stdModal = document.querySelector('#std')
      const supprModal = document.querySelector('#suppr')
      M.Modal.init(stdModal)
      M.Modal.init(supprModal, { onCloseEnd: () => router.push({ name: 'Backend' }) })
    })

    return { question, erreur, addTag, remTag, save, addChoice, remChoice, titreModal, typeModal, confirmSuppr, suppr }
  }
}
</script>

<style scoped>
#sujet {
  margin-top: 0.5em;
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