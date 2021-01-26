<template>
<div class="container">
  <div v-if="question" class="row">
    <h3 class="center-align">Détails de la question {{ id }}</h3>
    <form class="col s12">
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

      </div>
      <Tags :tags="question.tags" @addTag="updateTags" @remTag="updateTags" />
      <div class="btn">Enregistrer</div>
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

    load()

    return { question, erreur, updateTags }
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
</style>