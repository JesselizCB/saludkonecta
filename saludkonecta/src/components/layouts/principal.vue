<template>
  <v-app id="inspire">
    <!-- expand-on-hover -->
    <!-- :mini-variant.sync="mini" -->
    <v-navigation-drawer
      width="200"
      color="#FFFFFF"
      v-model="drawer"
      app
      :mini-variant="miniVariant"
      permanent
      dark
      class="white--text"
    >
      <v-list-item link @click.stop="miniVariant = !miniVariant">
        <v-list-item-content>
          <v-list-item-title class="headline font-weight-bold teal--text text-center">Konecta</v-list-item-title>
        </v-list-item-content>
        <v-btn icon @click.stop="miniVariant = !miniVariant">
          <v-icon class="teal--text">menu_open</v-icon>
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
                class="black--text subtitle-2"
                @click="$router.push('/Home')"
              >Inicio</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>

      <template v-slot:append>
        <v-list-item link @click.prevent="signOut">
          <v-list-item-action>
            <v-icon class="teal--text">power_settings_new</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title @click.prevent="signOut" class="teal--text">Cerrar Sesión</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-navigation-drawer>

    <v-content style="background-color:#F5F6F9;">
      <v-app-bar color="teal accent-4" dense dark>
        <v-app-bar-nav-icon><v-icon>menu</v-icon></v-app-bar-nav-icon>
        <v-toolbar-title>{{title}}</v-toolbar-title>
      </v-app-bar>
      <v-container fluid>
        <v-row align="center" justify="center">
          <v-col>
            <router-view></router-view>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
// import { mapGetters } from "vuex";
// import firebase from "firebase";
export default {
  props: {
    source: String
  },
  data: () => ({
    title: localStorage.getItem("navBar"),
    drawer: true,
    mini: true,
    miniVariant: false
  }),
  computed: {
    // map `this.user` to `this.$store.getters.user`
    /*  ...mapGetters({
      user: "user"
    }) */
  },
  methods: {
    /* signOut() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.replace({
            name: "login"
          });
        });
    } */
  }
};
</script>

<style>
.size{
  width: 5vw;
}
</style>
