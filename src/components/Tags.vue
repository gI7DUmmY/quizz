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
      v-for="(tag, index) in tags" :key="index">
      #{{ tag }}
      <i class="close material-icons">close</i>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  props: ['tags'],
  setup (props) {
    const newTag = ref('')
    let lesTags = ref([])
    let tagSet = new Set()

    props.tags.forEach(item => {
      tagSet.add(item)
    })

    lesTags.value = [...tagSet]

    return { newTag, lesTags }
  },
  methods: {
    addTag () {
      if (!this.lesTags.includes(this.newTag)) {
        this.newTag = this.newTag.replace(/\s/g,'') // remove all whitespace
        this.lesTags.push(this.newTag)
      }

      this.newTag = ''
      this.$emit('addTag', this.lesTags)
    }
  }
}
</script>

<style>

</style>