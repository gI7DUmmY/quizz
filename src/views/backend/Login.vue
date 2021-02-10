<template>
  <div class="container center-align">
    <h3>Connexion au backend</h3>
    <div class="row">
      <form @submit.prevent="connecter" class="col s12">
        <div class="row">
          <div class="input-field col s6 offset-s3">
            <input id="email" type="email" class="validate" required>
            <label for="email">Email</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s6 offset-s3">
            <input id="password" type="password" class="validate" required>
            <label for="password">Password</label>
          </div>
        </div>
        <div>
          <button type="submit" class="btn">Connecter</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'

export default {
  name: 'Login',
  setup() {
    const router = new useRouter()
    const connecter = () => router.push({ name: 'Backend' })

    return { connecter }
  }
}
</script>

<style>

</style>