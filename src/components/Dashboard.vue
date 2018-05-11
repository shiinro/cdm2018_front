<template>
  <div class="pusher">
    <Navigation></Navigation>
    <div class="ui container">
      <div class="ui massive message">Bienvenue {{user.username}} !!!</div>
      <div class="ui large message green">Votre score actuel est de : {{user.points}}</div>
    </div>
  </div>
</template>

<script>
import Navigation from './Navigation.vue'

export default {
  computed: {
    user () {
      return this.$store.getters.user
    }
  },
  components: {
    Navigation
  }
}
</script>
