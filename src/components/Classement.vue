<template>
  <div class="pusher">
    <navigation></navigation>
    <div class="ui container">
      <table class="ui celled table center aligned">
        <thead>
          <tr>
            <th class="four wide">Classement</th>
            <th>Nom</th>
            <th>Nombre de score exact</th>
            <th>Nombre d'équipe gagnante</th>
            <th>Points</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(user, index) in classement" v-bind:key="user.nomUser" :class="userName === user.nomUser ? 'ui inverted positive' : ''">
            <td>
              <h4 class="ui image tiny header">
                <img src="../assets/classement_1.png" alt="" class="ui mini rounded image" v-if="(index+1) == 1">
                <img src="../assets/classement_2.png" alt="" class="ui mini rounded image" v-if="(index+1) == 2">
                <img src="../assets/classement_3.png" alt="" class="ui mini rounded image" v-if="(index+1) == 3">
                <div class="content" v-if="index > 3">
                  {{index +1}}
                </div>
              </h4>
            </td>
            <td>
              <div class="content">
                {{user.nomUser}}
              </div>
            </td>
            <td>
              {{user.nbScoreExact}}
            </td>
            <td>
              {{user.nbEquipeGagnante}}
            </td>
            <td>
              {{user.points}}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import Navigation from './Navigation.vue'
import {mapGetters} from 'vuex'

export default {
  data () {
    return {
      userName: this.$store.getters.user.username
    }
  },
  components: {
    Navigation
  },
  computed: {
    ...mapGetters(['classement'])
  },
  mounted () {
    this.users = this.loadClassement()
  },
  methods: {
    loadClassement: async function () {
      await this.$store.dispatch('classement')
    }
  }
}
</script>
