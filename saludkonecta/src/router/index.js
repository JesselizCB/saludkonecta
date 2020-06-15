import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import Expediente from '../views/Expediente.vue';
import firebase from "firebase/app";

Vue.use(VueRouter);


const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login,
  },
  {
    path: '/Home',
    name: 'Home',
    component: Home,
    meta: { reqAuth: true },
    beforeEnter: (to, from, next) => {
      if (!firebase.auth().currentUser) {
        next('/')
      } else {
        next()
      }
    },
  },
  {
    path: '/details',
    name: 'Expediente',
    props: true,
    component: Expediente,
    meta: { reqAuth: true },
    beforeEnter: (to, from, next) => {
      if (!firebase.auth().currentUser) {
        next('/')
      } else {
        next()
      }
    },
  },
  // route level code-splitting
  // this generates a separate chunk (about.[hash].js) for this route
  // which is lazy-loaded when the route is visited.
  // component: () => import(/* webpackChunkName: "about" */ '../views/Expediente.vue'),
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
