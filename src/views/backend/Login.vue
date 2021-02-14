<template>
  <div class="container center-align">
    <h3>Connexion au backend</h3>
    <div class="row">
      <form @submit.prevent="connecter" class="col s12">
        <div class="row">
          <div class="input-field col s6 offset-s3">
            <input 
              id="email" type="email" class="validate" required
              v-model="email"
            >
            <label for="email">Email</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s6 offset-s3">
            <input
              id="password" type="password" class="validate" required
              v-model="pwd"
            >
            <label for="password">Mot de Passe</label>
          </div>
        </div>
        <div class="row">{{ erreur }}</div>
        <div class="row">
          <button type="submit" class="btn">Connecter</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import useLogin from '../../composables/useLogin'

export default {
  name: 'Login',
  setup() {
    const router = new useRouter()
    const email = ref(null)
    const pwd = ref(null)
    const { erreur, login } = useLogin()

    const connecter = async () => {
      await login(email.value, pwd.value)

      if (!erreur.value) {
        router.push({ name: 'Backend' })
      }
    }
    return { email, pwd, erreur, connecter }
  }
}
</script>

<style>

</style>