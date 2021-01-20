<template>
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
        <td class="num">#{{ question.id }}</td>
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
</template>

<script>
export default {
  props: [ 'qcm' ],
}
</script>

<style>

</style>