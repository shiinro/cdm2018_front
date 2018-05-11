<template>
  <div class="ui tabs menu">
      <div class="ui container">
        <router-link :to="{name: 'root'}" @click.prevent class="header item"><img src="../assets/cdm2018.png"></router-link>
        <router-link :to="{name: 'accueil'}" @click.prevent class="header item" v-if="user.username">Dashboard</router-link>
        <router-link :to="{name: 'matchs'}" class="item">Matchs</router-link>
        <router-link :to="{name: 'pronos'}" class="item">Pronostics</router-link>
        <router-link :to="{name: 'classement'}" class="item">Classement</router-link>
      </div>
      <div class="right item" v-if="user.username">{{user.username}}</div>
      <div class="right item">
        <a href="#" @click.prevent="logout" v-if="user.username">Logout</a>
        <router-link :to="{name: 'login'}" v-if="!user.username">Login</router-link>
      </div>
    </div>
</template>

<script>
export default {
  computed: {
    user () {
      return this.$store.getters.user
    }
  },
  methods: {
    logout () {
      this.$store.dispatch('logout').then(() => {
        this.$router.push('/')
      })
    }
  }
}
</script>
