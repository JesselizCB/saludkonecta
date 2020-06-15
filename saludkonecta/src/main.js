import 'material-design-icons-iconfont/dist/material-design-icons.css';
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import vuetify from './plugins/vuetify';
import { store } from './store';
import * as firebase from 'firebase/app'
import 'firebase/firestore'

require('firebase/firestore');
var firebaseConfig = {
  apiKey: "AIzaSyAISAY16hKMYpRsMjvu-6af_gtzaaQU2fM",
  authDomain: "konectasalud.firebaseapp.com",
  databaseURL: "https://konectasalud.firebaseio.com",
  projectId: "konectasalud",
  storageBucket: "konectasalud.appspot.com",
  messagingSenderId: "969836221651",
  appId: "1:969836221651:web:6a45ce2a88aa3b2e5ff026"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore()
Vue.config.productionTip = false;
Vue.prototype.$firebase = firebase;

firebase.auth().onAuthStateChanged(user => {
  store.dispatch("fetchUser", user);
});

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
