<template>
  <v-app>
    <!-- expand-on-hover -->
    <!-- :mini-variant.sync="mini" -->
    <v-navigation-drawer
      width="180"
      color="#FFFFFF"
      v-model="drawer"
      app
      :mini-variant="miniVariant"
      permanent
    >
      <v-list-item link @click.stop="miniVariant = !miniVariant">
        <v-list-item-content>
          <v-list-item-title class="headline font-weight-bold text-center titleKonecta">Konecta</v-list-item-title>
        </v-list-item-content>
        <v-btn icon color="#182c50" @click.stop="miniVariant = !miniVariant">
          <v-icon>menu_open</v-icon>
        </v-btn>
      </v-list-item>
      <v-divider></v-divider>
      <v-list dense>
        <v-list-item-group>
          <v-list-item link to="/Home">
            <v-list-item-icon>
              <v-icon color="black">home</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title
                class="black--text subtitle-1"
                @click="$router.push('/Home')"
              >Inicio</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>

      <template v-slot:append>
        <v-list-item link @click.prevent="signOut">
          <v-list-item-action>
            <v-icon color="#182c50">power_settings_new</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title class="titleKonecta body-2" @click.prevent="signOut">Cerrar Sesión</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-navigation-drawer>

    <v-content style="background-color:#F5F6F9;">
            <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";
import * as firebase from "firebase/app";
export default {
  props: {
    source: String
  },
  data: () => ({
    title: localStorage.getItem("navBar"),
    currentUrl: window.location.pathname,
    drawer: true,
    mini: true,
    miniVariant: false
  }),
  computed: {
    ...mapGetters({
      user: "user"
    })
  },
  created: function() {
    var currentUrl = window.location.pathname;
    console.log(currentUrl);
  },
  methods: {
    signOut() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.replace({
            path: "/"
          });
        });
    }
  }
};
</script>

<style>
.size {
  width: 5vw;
}
.titleKonecta{
  color: #182c50;
}
</style>
