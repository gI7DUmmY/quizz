<template>
  <div class="container">
    <h1 class="center-align">Backend</h1>
    <div v-if="qcm.length">
      <table class="highlight responsive-table">
        <thead>
          <tr>
            <th>N°</th>
            <th>Sujet</th>
            <th class="right-align">Tags</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(question, index) in qcm" :key="index">
            <td>#{{ question.id }}</td>
            <td>
              {{ question.sujet.slice(0,100) }}
              <span v-if="question.sujet.length > 99">...</span>
            </td>
            <td class="right-align">
              <div
                v-for="(tag, index) in question.tags"
                :key="index"
                class="tag"
              >
                #{{ tag }}
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else>{{ erreur }}</div>

  </div>
</template>

<script>
import GetQcm from '../composables/GetQcm'

export default {
  name: 'Backend',
  setup () {
    const { qcm, erreur, load } = GetQcm()

    load()

    return { qcm, erreur }
  }
}
</script>

<style>
.tag{
  display: inline-block;
}
</style>