<template>
  <div class="row">
    <div class="col s12">
      <h4 class="center-align">
        <slot>Chargement en cours...</slot>
      </h4>
    </div>
    <div class="col s12">
      <div id="spinner" class="center-align">
        <div class="preloader-wrapper active">
          <div class="spinner-layer spinner-blue-only">
            <div class="circle-clipper left">
              <div class="circle"></div>
            </div><div class="gap-patch">
              <div class="circle"></div>
            </div><div class="circle-clipper right">
              <div class="circle"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Preloader'
}
</script>

<style>
#spinner {
  margin-top: 2em;
}
</style>