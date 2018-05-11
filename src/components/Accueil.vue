<template>
  <div class="pusher">
    <Navigation></Navigation>
    <div class="ui container">
      <h2 class="ui center aligned icon header">
        <i class="circular futbol icon"></i>
        Coupe du Monde 2018
      </h2>
      <div class="ui massive message">Bienvenue sur le site de pronostics pour la coupe du monde 2018<br />
        Ce site n'est pas parfait et des failles existent surement :) <br /><br />
        Merci de ne pas les exploiter
        </div>
    </div>
  </div>
</template>

<script>
import Navigation from './Navigation.vue'
export default {
  components: {
    Navigation
  }
}
</script>
