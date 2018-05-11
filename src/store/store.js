import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

var get = async function (url) {
  let reponse = await fetch(url, {
  })
  if (reponse.ok) {
    return reponse.json()
  }
}

var post = async function (url, data) {
  let reponse = await fetch(url, {
    method: 'post',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  if (reponse.ok) {
    return reponse.json()
  } else {
    return 'KO'
  }
}

export default new Vuex.Store({
  strict: true,
  state: {
    matches: {},
    groupes: {},
    isAuthenticated: false,
    user: {},
    classement: [],
    pronostics: {},
    groupMatch: {}
  },
  getters: {
    matches: function (state) {
      return state.matches
    },
    groupes: function (state) {
      return state.groupes
    },
    user: function (state) {
      return state.user
    },
    classement: function (state) {
      return state.classement
    },
    pronostics: function (state) {
      return state.pronostics
    },
    groupMatch: function (state) {
      return state.groupMatch
    }
  },
  mutations: {
    ADD_MATCH: function (state, {matches}) {
      state.matches = {}
      matches.forEach(element => {
        state.matches[element.id] = element
      })
    },
    ADD_GROUP: function (state, {groupes}) {
      groupes.forEach(element => {
        state.groupes[element.id] = element
      })
    },
    AUTHENTICATED: function (state, {isAuthenticated, user}) {
      state.isAuthenticated = isAuthenticated
      state.user = isAuthenticated === true ? user : {}
    },
    CLASSEMENT: function (state, classement) {
      this.state.classement = classement
    },
    ADD_GROUP_MATCH: function (state, {matches}) {
      state.groupMatch = matches
    },
    ADD_PRONOSTICS: function (state, {pronostics}) {
      state.pronostics = pronostics
    },
    UPDATE_PRONO: function (state, {id, type, value}) {
      for (var date in state.pronostics) {
        state.pronostics[date].forEach(pronostic => {
          if (pronostic) {
            if (pronostic.id === id) {
              if (type === 1) {
                pronostic.scoreEquipeHome = value
              } else if (type === 2) {
                pronostic.scoreEquipeAway = value
              }
            }
          }
        })
      }
    }
  },
  actions: {
    loadMatches: async function (context) {
      let response = await get('http://127.0.0.1:8080/match/all')
      context.commit('ADD_MATCH', {matches: response})
    },
    loadGroupes: async function (context) {
      let response = await get('http://127.0.0.1:8080/group/all')
      context.commit('ADD_GROUP', {groupes: response})
    },
    loadMatchesFromGroup: async function (context, groupe) {
      if (groupe) {
        let response = await get('http://127.0.0.1:8080/match/group/' + groupe)
        context.commit('ADD_MATCH', {matches: response})
      }
    },
    login: async function (context, {mail, password}) {
      let body = {
        'mail': mail,
        'password': password
      }
      let user = await post('http://127.0.0.1:8080/login', body)
      console.log(user)
      context.commit('AUTHENTICATED', {isAuthenticated: true, user: user})
      localStorage.setItem('user-token', user.token)
    },
    signin: async function (context, {name, mail, password}) {
      let body = {
        'username': name,
        'mail': mail,
        'password': password
      }
      let response = await post('http://127.0.0.1:8080/signin', body)
      if (response === 'KO') {
      }
    },
    logout: function (context) {
      context.commit('AUTHENTICATED', false)
      localStorage.removeItem('user-token')
    },
    classement: async function (context) {
      let classement = await get('http://127.0.0.1:8080/classement')
      context.commit('CLASSEMENT', classement)
    },
    getPronostics: async function (context, userId) {
      if (userId) {
        let pronostics = await get('http://127.0.0.1:8080/pronostic/' + userId)
        context.commit('ADD_PRONOSTICS', {pronostics: pronostics})
      }
    },
    updateProno: function (context, {id, type, value}) {
      context.commit('UPDATE_PRONO', {id: id, type: type, value: value})
    }
  }
})
