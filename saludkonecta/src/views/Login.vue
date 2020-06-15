<template>
<v-col cols="12" sm="6" md="4">
  <v-card class="elevation-12">
    <v-toolbar color="teal" dark flat class="justify-center">
      <v-toolbar-title>Registro de Salud</v-toolbar-title>
    </v-toolbar>
    <v-form action="#" @submit.prevent="submit">
      <v-card-text>
        <v-text-field
          :rules="emailRules"
          class="form-control pb-2"
          label="Usuario"
          name="login"
          color="teal"
          prepend-icon="account_circle"
          type="text"
          required
          autofocus
          v-model="form.email"
        />
        <v-text-field
          :rules="passwordRules"
          class="form-control pb-2"
          id="password"
          label="Contraseña"
          color="teal"
          name="password"
          prepend-icon="vpn_key"
          type="password"
          required
          v-model="form.password"
        />
        <v-alert dense outlined type="error" v-if="error">{{error}}</v-alert>
      </v-card-text>
      <v-card-actions class="justify-center pb-8">
        <v-btn
          color="#00968F"
          class="text-capitalize white--text"
          width="220"
          type="submit"
        >Ingresar</v-btn>
      </v-card-actions>
    </v-form>
  </v-card>
  </v-col>
</template>

<script>

import * as firebase from 'firebase/app'
import {getDoctor} from "../firebase/colaborador"

export default {
  created() {
    this.$store.commit("SET_LAYOUT", "login-layout");
  },
  data() {
    return {
      form: {
        email: "",
        password: ""
      },
      emailRules: [v => !!v || "El usuario es requerido"],
      passwordRules: [v => !!v || "La contraseña es requirida"],
      error: null
    };
  },
  methods: {
    submit() {
       const email = `${this.form.email}@konecta.com`;
        firebase
        .auth()
        .signInWithEmailAndPassword(email, this.form.password)
        .then(data => { 
          getDoctor(data.user.uid).then((value) => {
            localStorage.setItem("doctor",value.data().name);
            this.$router.replace({ path: "/Home" });
          })
       })
        .catch(err => {
          switch (err.code) {
            case "auth/user-not-found":
              this.error = "El usuario no se encuentra registrado";
              break;
            case "auth/wrong-password":
              this.error = "La contraseña es incorrecta";
              break;
            case "auth/invalid-email":
              this.error = "No se ingresó ningún correo electrónico";
              break;
            default:
              this.error = "Se ha producido un error";
          }
        });
    }
  }
};
</script>
