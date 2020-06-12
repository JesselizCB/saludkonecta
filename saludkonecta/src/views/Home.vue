<template>
  <v-container>
    <v-row class="justify-space-between">
      <v-col cols="3">
        <v-text-field v-model="search" append-icon="search" label="Buscar" single-line hide-details></v-text-field>
      </v-col>
      <v-col cols="3" class="mt-3">
        <v-select
          :items="filterEstado"
          v-model="filterEstadoValue"
          label="Seleccionar Estado"
          dense
          @change="onfilterEstado(filterEstadoValue)"
        ></v-select>
      </v-col>
      <v-col cols="3" class="pb-0 mt-3">
        <v-btn color="teal accent-4 white--text" @click.stop="registerForm=true">
          Crear Registro
          <v-icon right class="white--text">plus-circle</v-icon>
        </v-btn>
        <register :visible="registerForm" @close="registerForm=false"></register>
      </v-col>
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
        >
          <template v-slot:item.detail="{ item }">
            <v-btn x-small color="teal accent-4 white--text" @click="openPaciente(item)">Detalles</v-btn>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// @ is an alias to /src
import register from "../components/register";

export default {
  name: "Home",
  components: {
    register
  },
  created() {
    this.$store.commit("SET_LAYOUT", "principal-layout");
  },
  data() {
    return {
      registerForm: false,
      search: "",
      filterEstado: [
        "Todos",
        "Acreditado",
        "Fallecido",
        "Hospitalizado",
        "Negativo",
        "Sospechoso",
        "Recuperado"
      ],
      filterEstadoValue: "",
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
        { text: "Observación", value: "information", sortable: false },
        { text: "Detalle", value: "detail", sortable: false }
      ],
      desserts: [
        {
          dni: "Frozen Yogurt",
          nombre: 200,
          phone: 6.0,
          account: 24,
          status: 4.0,
          date: "1%",
          information:"Llllllllllll"
        },
      ]
    };
  },
  methods: {
    openPaciente(item){
      localStorage.setItem("navBar", "Maray Montes de Oca");
      this.$router.replace({ path: "/details" });
    }
  }
};
</script>
