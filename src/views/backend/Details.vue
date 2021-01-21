<template>
<div class="container">
  <div v-if="question">
    <h2 class="center-align">Détails de la question {{ id }}</h2>
    <h3>Sujet :</h3>
    <p>
      <span v-for="(tag, index) in question.tags" :key="index">
        #{{ tag }}
      </span>
    </p>
    <p>{{ question.sujet }}</p>
    <h3>Les réponses :</h3>
    <div v-for="(rep, index) in question.choix" :key="index">
      {{ rep.texte }} = {{ rep.note }}point(s)
    </div>
  </div>
</div>
</template>

<script>
import { ref } from 'vue'
import GetQuestion from '@/composables/GetQuestion'

export default {
  name: 'Details',
  props: [ 'id' ],
  setup (props) {
    const { question, erreur, load } = GetQuestion(props.id)

    load()

    return { question, erreur }
  }
}
</script>

<style>

</style>