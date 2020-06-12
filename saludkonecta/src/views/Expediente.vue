<template>
  <v-container>
    <v-row class="linkBack">
      <v-col>
        <a class="teal--text subtitle-1 font-weight-bold" @click="toBack()">
          <v-icon>keyboard_arrow_left</v-icon>Regresar
        </a>
      </v-col>
      <v-col cols="3">
        <v-btn color="teal accent-4 white--text" @click.stop="seguimientoForm=true">
          Añadir seguimiento
          <v-icon right class="white--text">plus-circle</v-icon>
        </v-btn>
        <seguimiento :visible="seguimientoForm" @close="seguimientoForm=false"></seguimiento>
      </v-col>
    </v-row>
    <v-row class="justify-space-between mt-2 mb-3">
      <v-col class="mt-3 ml-2">
        <p>Estado:</p>
      </v-col>
      <v-col cols="5" class="justify-end">
        <v-text-field v-model="search" append-icon="search" label="Buscar" single-line hide-details></v-text-field>
      </v-col>
    </v-row>
    <v-row class="size">
      <v-divider></v-divider>
    </v-row>
    <v-row class="justify-center mt-2">
      <v-col cols="11">
        <v-data-table
          :headers="headers"
          :items="desserts"
          :search="search"
          :sort-by="['calories', 'fat']"
          :sort-desc="[false, true]"
          multi-sort
          class="elevation-1"
        ></v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// @ is an alias to /src
import seguimiento from "../components/seguimiento";

export default {
  name: "Expediente",
  created() {
    this.$store.commit("SET_LAYOUT", "principal-layout");
  },
  components: {
    seguimiento
  },
  data() {
    return {
      seguimientoForm: false,
      search: "",
      headers: [
        {
          text: "N°",
          align: "start",
          sortable: false,
          value: "number"
        },
        { text: "Dni", value: "dni" },
        { text: "Nombres y apellidos", value: "nombre" },
        { text: "Celular", value: "phone", sortable: false },
        { text: "Cuenta", value: "account" },
        { text: "Estado", value: "status" },
        { text: "Fecha y hora", value: "date" },
        { text: "Observación", value: "information", sortable: false }
      ],
      desserts: [
        {
          name: "Frozen Yogurt",
          calories: 200,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
          iron: "1%"
        },
        {
          name: "Ice cream sandwich",
          calories: 200,
          fat: 9.0,
          carbs: 37,
          protein: 4.3,
          iron: "1%"
        },
        {
          name: "Eclair",
          calories: 300,
          fat: 16.0,
          carbs: 23,
          protein: 6.0,
          iron: "7%"
        },
        {
          name: "Cupcake",
          calories: 300,
          fat: 3.7,
          carbs: 67,
          protein: 4.3,
          iron: "8%"
        },
        {
          name: "Gingerbread",
          calories: 400,
          fat: 16.0,
          carbs: 49,
          protein: 3.9,
          iron: "16%"
        },
        {
          name: "Jelly bean",
          calories: 400,
          fat: 0.0,
          carbs: 94,
          protein: 0.0,
          iron: "0%"
        },
        {
          name: "Lollipop",
          calories: 400,
          fat: 0.2,
          carbs: 98,
          protein: 0,
          iron: "2%"
        },
        {
          name: "Honeycomb",
          calories: 400,
          fat: 3.2,
          carbs: 87,
          protein: 6.5,
          iron: "45%"
        },
        {
          name: "Donut",
          calories: 500,
          fat: 25.0,
          carbs: 51,
          protein: 4.9,
          iron: "22%"
        },
        {
          name: "KitKat",
          calories: 500,
          fat: 26.0,
          carbs: 65,
          protein: 7,
          iron: "6%"
        }
      ]
    };
  },
  methods: {
    toBack() {
      this.$router.replace({ path: "/Home" });
    }
  }
};
</script>
<style>
.size {
  width: 90%;
}
.linkBack {
  margin-top: -10px;
}
</style>