<template>
    <div class="ui middle aligned center aligned grid">
        <div class="column">
            <h2 class="ui teal image header">
            <img src="../assets/cdm2018.png" class="image">
            <div class="content">
                Sign In
            </div>
            </h2>
            <form class="ui large form">
                <div class="ui stacked segment">
                    <div class="field">
                        <div class="ui left icon input">
                            <i class="user icon"></i>
                            <input type="text" name="pseudo" placeholder="Pseudo" v-model="pseudo">
                        </div>
                    </div>
                    <div class="field">
                        <div class="ui left icon input">
                            <i class="user icon"></i>
                            <input type="text" name="email" placeholder="E-mail address" v-model="mail">
                        </div>
                    </div>
                    <div class="field">
                        <div class="ui left icon input">
                            <i class="lock icon"></i>
                            <input type="password" name="password" placeholder="Password" v-model="password">
                        </div>
                    </div>
                    <div class="ui fluid large teal submit button" @click="signin">Sign In</div>
                </div>
                <div class="ui error message"></div>
            </form>
        </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      pseudo: '',
      mail: '',
      password: ''
    }
  },
  methods: {
    signin () {
      this.$store.dispatch('signin', {name: this.pseudo, mail: this.mail, password: this.password}).then(() => {
        this.$router.push(this.$route.query.redirect || '/accueil')
      })
    }
  }
}
</script>

<style scoped>
    .column {
        max-width:450px;
        margin-top: 30px;
    }
</style>
