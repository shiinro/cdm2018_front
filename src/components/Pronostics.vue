<template>
  <div class="pusher">
    <navigation></navigation>
    <div class="ui container">
      <form class="ui form" @submit.prevent="pushProno">
        <div v-for="(date,index) in pronoData" v-bind:key="index">
          <h2 class="header ui dividing">{{index}}</h2>
          <div class="seven fields" v-for="prono in date" v-bind:key="prono.id">
            <div class="ui image centered middle aligned field">
                <img class="ui tiny image" :src="prono.equipeHome.flag" alt="image"/>
            </div>
            <div class="field">{{prono.equipeHome.nom}}</div>
            <div class="field">
              <input type="number" :class="'field ' + (beforeDate(index, now) ? 'disabled' : '')" @input="updateProno(prono.id, 1, prono.scoreEquipeHome)" v-model="prono.scoreEquipeHome"/>
            </div>
            <div class="field">
              <img src="../assets/versus.png" alt="" class="ui image tiny"/>
            </div>
            <div class="field">
              <input type="number" class="field centered aligned" @input="updateProno(prono.id, 2, prono.scoreEquipeAway)" v-model="prono.scoreEquipeAway"/>
            </div>
            <div class="field">{{prono.equipeAway.nom}}</div>
            <div class="ui image field">
                <img :src="prono.equipeAway.flag" alt="image" class="ui tiny image"/>
            </div>
          </div>
        </div>
        <div class="ui buttons pronos">
          <button class="ui button negative">Annuler</button>
          <div class="or" data-text=""></div>
          <input type="submit" class="ui button teal" value="Pronostiquer"/>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import Navigation from './Navigation.vue'
import {mapGetters} from 'vuex'
import moment from 'moment'

moment.locale('fr')

export default {
  components: {
    Navigation
  },
  computed: {
    ...mapGetters(['pronostics']),
    pronoData () {
      return JSON.parse(JSON.stringify(this.$store.getters.pronostics))
    },
    now () {
      return moment(new Date()).format('DD/MM/YYYY')
    }
  },
  mounted () {
    this.$store.dispatch('getPronostics', this.$store.getters.user.id)
  },
  methods: {
    pushProno: function () {
      this.$store.dispatch('setPronos')
    },
    updateProno: function (id, type, value) {
      this.$store.dispatch('updateProno', {id: id, type: type, value: value})
    },
    beforeDate: function (date1, date2) {
      let formatDate1 = moment(date1, 'DD/MM/YYYY')
      let formatDate2 = moment(date2, 'DD/MM/YYYY')
      let beforeOrSame = formatDate1.isSameOrBefore(formatDate2)
      return beforeOrSame
    }
  }
}
</script>

<style scoped>
  .pronos {
    position: fixed;
    bottom:0;
    right:0;
    margin-bottom: 15px;
    margin-right: 15px;
  }
</style>
