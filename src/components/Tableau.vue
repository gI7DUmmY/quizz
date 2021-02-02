<template>
  <div>{{ qcm.length }} résultat(s)</div>
  <table class="highlight responsive-table">
    <thead>
      <tr>
        <th>N°</th>
        <th>Sujet</th>
        <th class="right-align">Tags</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(question, index) in qcm" :key="index"
        @click="GoDetails(question.id)"
      >
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
            :class="{ match: matched(tag) }"
          >
            #{{ tag }}
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { useRouter } from 'vue-router'

export default {
  props: [ 'qcm', 'search' ],
  setup (props) {
    const router  = new useRouter
    const matched = (tag) => tag.includes(props.search)
    const GoDetails = (id) => router.push({ name: 'Details', params: { id } })

    return { matched, GoDetails }
  }
}
</script>

<style scoped>
.tag{
  display: inline-block;
  margin-left: 0.3em;
}
.match {
  color: #4db6ac;
  font-weight: 500;
}
</style>