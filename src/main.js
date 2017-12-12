import 'material-design-lite/material.min.css'
import 'material-design-lite'
import Vue from 'vue'
import VueRouter from 'vue-router'

import App from './components/App.vue'
import Home from './components/Home.vue'
import CardList from './components/CardList.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', component: App, children: [
    { path: '', component: Home },
    { path: 'cards', component: CardList }
  ] }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

const app = new Vue({
  router
})
app.$mount('#app')

