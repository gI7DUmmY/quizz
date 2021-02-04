<template>
  <div :id="id" class="modal">
    <div class="modal-content">
      <h4 class="center-align"><slot></slot></h4>
    </div>
    <div v-if="type === 'save'" class="modal-footer">
      <router-link class="modal-close waves-effect waves-green btn-flat left"
        :to="{ name: 'Backend' }">
        revenir à la liste
      </router-link>
      <button class="modal-close waves-effect waves-green btn-flat right">
        Continuer
      </button>
    </div>

    <div v-if="type === 'confirmSuppr'" class="modal-footer">
      <button class="modal-close waves-effect waves-green btn red left">
        NON
      </button>
      <button
        class="modal-close waves-effect waves-green btn right"
        @click="suppr"
      >
        OUI
      </button>
    </div>

    <div v-if="type === 'suppr'" class="modal-footer">
      <router-link class="modal-close waves-effect waves-green btn-flat"
        :to="{ name: 'Backend' }">
        revenir à la liste
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "Modal",
  props: [ 'id', 'type' ],
  setup(props, { emit }) {
    const suppr = () => {
      if (props.type === 'confirmSuppr') emit('suppr')
    }

    return { suppr }
  }
}
</script>

<style scoped>
</style>