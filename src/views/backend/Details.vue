<template>
<div class="container">
  <div v-if="question" class="row">
    <h3 class="center-align">Détails de la question {{ id }}</h3>
    <form @submit.prevent="save" class="col s12">
      <div class="row">
        <div class="input-field col s12" id="sujet">
          <div class="entete">Sujet :</div>
          <textarea :value="question.sujet" id="sujet" class="materialize-textarea"></textarea>
        </div>
      </div>

      <div class="row">
        <div class="entete">Les choix :</div>
        <div class="row grey-text text-lighten-1" id="colonne">
          <span class="col s9">texte</span>
          <span class="col s1 offset-s1">note</span>
        </div>
        <div v-for="(rep, index) in question.choix" :key="index" class="input-field col s12">
          <div class="row">
            <input type="text" :value="rep.texte" class="col s9">
            <input type="number" :value="rep.note" class="col s1 offset-s1">
          </div>
        </div>
        <button class="btn-floating" @click="addChoice">
          <i class="material-icons">add</i>
        </button>

      </div>
      <Tags :tags="question.tags" @addTag="updateTags" @remTag="updateTags" />
      <button type="submit" class="btn">Enregistrer</button>
    </form>
  </div>
</div>
</template>

<script>
import { ref } from 'vue'
import GetQuestion from '@/composables/GetQuestion'
import Tags from '@/components/Tags.vue'

export default {
  name: 'Details',
  props: [ 'id' ],
  components: { Tags },
  setup (props) {
    const { question, erreur, load } = GetQuestion(props.id)

    const updateTags = async (payload) => {
      try {
        await fetch('http://localhost:3000/quizz/' + props.id,
          {
            method: "PATCH",
            headers: { 'Content-Type': 'application/json;charset=utf-8' },
            body: JSON.stringify(payload)
          })
      } catch (err) {
        console.log(err.message)
      }
    }

    const save = async () => {}

    const addChoice = () => {
      console.log(question.value.choix.length)
      const newChoice = { id: question.value.choix.length, texte: 'Nouveau choix', note: 0 }
      question.value.choix.push(newChoice)
    }

    load()

    return { question, erreur, updateTags, save, addChoice }
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
button[type="submit"], button[type="reset"] {
  display: block;
  margin-top: 2em;
  margin-right: auto;
  margin-left: auto;
}
</style>