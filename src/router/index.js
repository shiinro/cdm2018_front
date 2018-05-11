import Vue from 'vue'
import Router from 'vue-router'
import Matches from '@/components/Matches'
import Classement from '@/components/Classement'
import Accueil from '@/components/Accueil'
import Pronostics from '@/components/Pronostics'
import Login from '@/components/Login'
import Signin from '@/components/Signin'
import Dashboard from '@/components/Dashboard'

Vue.use(Router)

var requireAuth = function (to, from, next) {
  if (!localStorage.getItem('user-token')) {
    next({
      path: '/login',
      query: { redirect: to.fullPath }
    })
  } else {
    next()
  }
}

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'root',
      component: Accueil
    },
    {
      path: '/accueil',
      name: 'accueil',
      component: Dashboard,
      beforeEnter: requireAuth
    },
    {
      path: '/match',
      name: 'matchs',
      component: Matches
    },
    {
      path: '/classement',
      name: 'classement',
      component: Classement
    },
    {
      path: '/pronostics',
      name: 'pronos',
      component: Pronostics,
      beforeEnter: requireAuth
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/signin',
      name: 'signin',
      component: Signin
    }
  ]
})
