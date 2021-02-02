<template>
  <div class="navbar-fixed">
    <nav>
      <div class="nav-wrapper blue">
        <!-- <a href="#!" class="brand-logo">Logo</a> -->
        <ul>
          <li>
            <router-link to="/">
              <i class="material-icons left">home</i>Accueil
            </router-link>
          </li>
          <li class="right">
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

<style>
@font-face {
  font-family: "Fraud";
  src: local("Fraud"),
   url(./assets/fonts/Fraud.ttf) format("truetype");
}
.container {
  margin-bottom: 2em;
}
</style>