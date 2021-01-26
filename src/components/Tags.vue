<template>
  <div>
    <div class="entete">Tags :</div>
    <div class="input-field">
      <input
        type="text" v-model="newTag"
        @keydown.enter.prevent="addTag">
    </div>
    <div
      class="chip"
      v-for="(tag, index) in lesTags" :key="index">
      #{{ tag }}
      <i
        class="tiny material-icons"
        @click="remTag(tag)"
      >close
      </i>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  props: ['tags'],
  setup (props, { emit }) {
    const newTag = ref('')
    let lesTags = ref([])
    let tagSet = new Set()

    props.tags.forEach(item => {
      tagSet.add(item)
    })

    lesTags.value = [...tagSet]

    const addTag = () => {
      const res = { tags: [] }
      if (!lesTags.value.includes(newTag.value)) {
        newTag.value = newTag.value.replace(/\s/g,'') // remove all whitespace
        lesTags.value.push(newTag.value)
      }
      res.tags = lesTags.value
      newTag.value = ''
      emit('addTag', res)
    }

    const remTag = (tag) => {
      const res = { tags: [] }
      lesTags.value = lesTags.value.filter(el => el !== tag)
      res.tags = lesTags.value
      emit('remTag', res)
    }

    return { newTag, lesTags, addTag, remTag }
  }
}
</script>

<style scoped>
.material-icons {
  cursor: pointer;
}
</style>