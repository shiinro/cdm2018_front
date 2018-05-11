<template>
  <div class="pusher">
    <Navigation></Navigation>
    <div class="ui container">
      <div class="ui eight item menu">
        <a href="#" v-for="groupe in groupes" v-bind:key="groupe.id" class="item" @click.prevent="loadMatchFromGroup(groupe.id)">{{groupe.nom}}</a>
      </div>
      <h2 class="ui dividing header">Matches</h2>
      <div class="ui grid">
        <Match :match="match" v-for="match in matches"  v-bind:key="match.id" v-if="matches"></match>
      </div>
    </div>
  </div>
</template>

<script>
import Navigation from './Navigation.vue'
import {mapGetters} from 'vuex'
import Match from './Match'

export default {
  data () {
    return {
      loading: false,
      groupe: ''
    }
  },
  mounted () {
    this.$store.dispatch('loadGroupes')
    this.loadMatchFromGroup()
    this.loading = true
  },
  computed: {
    ...mapGetters(['matches']),
    ...mapGetters(['groupes'])
  },
  methods: {
    loadMatchFromGroup (groupe) {
      if (!groupe) {
        groupe = 1
      }
      this.groupe = groupe
      this.$store.dispatch('loadMatchesFromGroup', this.groupe)
    }
  },
  components: {
    Match,
    Navigation
  }
}
</script>
