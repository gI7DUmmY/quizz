<template>
  <div class="row">
    <div class="entete">Tags :</div>
    <div class="input-field">
      <input
        type="text" v-model="newTag"
        @keydown.enter.prevent="addTag">
    </div>
    <div
      class="chip"
      v-for="(tag, index) in tags" :key="index">
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
  setup (_, { emit }) {
    const newTag = ref('')

    const addTag = () => {
      emit('addTag', newTag.value)
      newTag.value = ''
    }

    const remTag = (tag) => {
      emit('remTag', tag)
    }

    return { newTag, addTag, remTag }
  }
}
</script>

<style scoped>
.material-icons {
  cursor: pointer;
}
</style>