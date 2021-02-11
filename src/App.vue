<template>
  <div class="navbar-fixed">
    <nav>
      <div class="nav-wrapper blue">
        <a href="https://www.ffft.fr/" target="_blank" class="brand-logo center">
          <img src="@/assets/FFFT_logo.png" alt="logo_ffft" class="responsive-img">
        </a>
        <ul>
          <li>
            <router-link to="/">
              <i class="material-icons left">home</i>Accueil
            </router-link>
          </li>
          <li v-if="user" @click="deconnecter" class="right">
            <a><i class="material-icons left">lock_open</i>Déconnexion</a>
          </li>
          <li v-if="!user" class="right">
            <router-link :to="{ name: 'Login' }">
              <i class="material-icons left">lock</i>Connexion
            </router-link>
          </li>
          <li v-if="user" class="right">
            <router-link :to="{ name: 'Backend' }">
              <i class="material-icons left">build</i>Backend
            </router-link>
          </li>
        </ul>
      </div>
    </nav>
  </div>

  <router-view />
</template>

<script>
import getUser from './composables/getUser'
import useLogout from './composables/useLogout'

export default {
  setup () {
    const { user } = getUser()
    const { logoutError, logout } = useLogout()
    
    const deconnecter = async () => {
      await logout()

      if (!logoutError.value) {
        console.log('Déconnexion OK')
      }
    }

    return { user, deconnecter }
  }
}
</script>

<style>
@font-face {
  font-family: "Fraud";
  src: local("Fraud"),
   url(./assets/fonts/Fraud.ttf) format("truetype");
}
.container {
  margin-bottom: 2em;
}
.brand-logo img {
  height: 56px;
  margin-top: 4px;
}
@media screen and (max-width: 600px) {
  .brand-logo img {
    height: 48px;
    margin-top: 4px;
  }
}
</style>