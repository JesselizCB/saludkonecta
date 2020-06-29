<template>
  <v-dialog v-model="show" max-width="550px" :persistent="true">
    <v-card>
      <v-card-title class="cardTitle">
        <v-row>
          <v-col cols="11" class="text-center">
            <span class="title-1 font-weight-bold colorKonecta ml-2">Listado de Pruebas</span>
          </v-col>
          <v-col cols="1" class="iconClose">
            <v-icon @click="show = false">highlight_off</v-icon>
          </v-col>
        </v-row>
        <v-row class="size">
          <v-divider></v-divider>
        </v-row>
      </v-card-title>
      <v-card-text>
        <div :key="index" v-for="(item, index) in listTest">
          <v-row class="firtsRow">
            <p>
              <span class="tittle">No:</span>
              {{index+1}}
            </p>
            <p>
              <span class="tittle">Fecha:</span>
              {{item.date}}
            </p>
          </v-row>
          <v-row class="secondRow">
            <p>
              <span class="tittle">Prueba:</span>
              {{item.prueba}}
            </p>
            <p>
              <span class="tittle">Resultado:</span>
              {{item.result}}
            </p>
          </v-row>
        </div>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { getPruebas } from "../firebase/colaborador";

export default {
  name: "listPruebas",
  props: ["visible", "listTest"],
  computed: {
    show: {
      get() {
        return this.visible;
      },
      set(value) {
        if (!value) {
          this.$emit("close");
        }
      }
    }
  },
  methods: {
    cleanData(){
      this.listTest = [];
    }
  },
};
</script>
<style>
.size {
  width: 90%;
}
.iconClose {
  margin-top: -10px;
}
.tittle {
  color: black;
  font-weight: bold;
  font-size: 14px;
  margin-left: 10px;
}
.secondRow{
  margin-top: -10px;
}
</style>
