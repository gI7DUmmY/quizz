<template>
  <div class="match">{{ qcm.length }} résultat(s)</div>
  <table class="highlight">
    <thead>
      <tr>
        <th>ID</th>
        <th>Sujet</th>
        <th class="right-align">Tags</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(question, index) in qcm" :key="index"
      >
        <td @click="GoDetails(question.id)" class="num">{{ question.id }}</td>
        <td @click="GoDetails(question.id)">
          {{ question.sujet.slice(0,100) }}
          <span v-if="question.sujet.length > 99">...</span>
        </td>
        <td class="right-align">
          <div
            v-for="(tag, index) in question.tags"
            :key="index"
            class="tag"
            :class="{ match: matched(tag) }"
            @click="searchTag(tag)"
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
  emits: [ 'searchTag' ],
  setup (props, { emit }) {
    const router  = new useRouter
    const matched = (tag) => tag.includes(props.search)
    const GoDetails = (id) => router.push({ name: 'Details', params: { id } })
    const searchTag = (tag) => emit('searchTag', tag)

    return { matched, GoDetails, searchTag }
  }
}
</script>

<style scoped>
tbody tr {
  cursor: pointer;
}
.tag{
  display: inline-block;
  margin-left: 0.3em;
}
.match {
  color: #4db6ac;
  font-weight: 500;
}
</style>