<template>
<div class="container">
  <div v-if="question">
    <h3 class="center-align">Ajouter une nouvelle question</h3>
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
          <span class="col s9">texte</span>
          <span class="col s1 offset-s1">note</span>
        </div>
        <div v-for="(rep, index) in question.choix" :key="index" class="input-field col s12">
          <div class="row">
            <input type="text" required v-model="rep.texte" class="col s9">
            <input type="number" required v-model="rep.note" step="1" class="col s1 offset-s1">
            <button
              class="btn-floating corbeille btn-small red"
              @click.prevent="remChoice(rep.id)"
              :class="{ disabled: question.choix.length < 3 }"
            >
              <i class="material-icons">delete</i>
            </button>
          </div>
        </div>
        <button class="btn-floating btn-small" @click.prevent="addChoice">
          <i class="material-icons">add</i>
        </button>

      </div>
      <Tags id="tags" :tags="question.tags" @updateTags="updateTags" />
      <button type="submit" class="btn">Enregistrer</button>
    </form>
  </div>
</div>
</template>

<script>
import { ref } from 'vue'
import Tags from '@/components/Tags.vue'

export default {
name: 'NewQuestion',
components: { Tags },
setup () {
  const question = ref({
    sujet: '',
    choix: [
      { id: 0, texte: 'Choix 1', note: 0 },
      { id: 1, texte: 'Choix 2', note: 0 }
    ],
    tags: []
  })

  const addChoice = () => {
    const newChoice = { id: question.value.choix.length, texte: 'Nouveau choix', note: 0 }
    question.value.choix.push(newChoice)
  }

  const remChoice = (id) => {
    question.value.choix = question.value.choix.filter(el => el.id !== id)
  }

  const updateTags = (payload) => question.value.tags = payload

  const save = async () => {
    question.value.choix.forEach(rep => {
      rep.note = parseFloat(rep.note)
    });
    try {
      await fetch('http://localhost:3000/quizz/',
        {
          method: "POST",
          mode: 'cors',
          headers: { 'Content-Type': 'application/json;charset=utf-8' },
          body: JSON.stringify(question.value)
        }
      )
    } catch (err) {
      console.log(err.message)
    }
  }

  return { question, addChoice, remChoice, updateTags, save }
}
}
</script>

<style>
#sujet {
  padding: 0px;
}
.entete {
  margin-bottom: 1em;
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
.corbeille {
  margin-left: 1.5em;
}
#tags {
  margin-top: 1.5em;
}
.input-field {
  margin-top: 0px;
}
</style>