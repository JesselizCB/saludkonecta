<template>
  <div>
    <navBar icon="assignment" title="Busqueda de casos" :enable="value"></navBar>
    <v-container>
      <v-row class="justify-space-between">
        <v-col cols="3 ml-3">
          <v-text-field
            v-model="search"
            append-icon="search"
            label="Buscar"
            single-line
            hide-details
          ></v-text-field>
        </v-col>
        <v-col cols="3" class="mt-4">
          <v-select
            :items="filterEstado"
            v-model="filterEstadoValue"
            label="Seleccionar Estado"
            dense
            @change="onfilterEstado(filterEstadoValue)"
          ></v-select>
        </v-col>
        <v-col cols="3" class="justify-end mt-4 ml-5">
          <v-btn color="#f9b233" class="white--text" @click.stop="registerForm=true">
            Crear Registro
            <v-icon right class="white--text">add_circle_outline</v-icon>
          </v-btn>
          <register :visible="registerForm" @close="registerForm=false"></register>
        </v-col>
      </v-row>
      <v-row class="justify-center mt-2">
        <v-col cols="12">
          <v-data-table
            :headers="headers"
            :items="dataTable"
            :search="search"
            :sort-by="['date']"
            multi-sort
            class="elevation-1"
          >
            <template v-slot:item.detail="{ item }">
              <v-btn x-small color="#f9b233" class="white--text" @click="openPaciente(item)">Control</v-btn>
            </template>
          </v-data-table>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
// @ is an alias to /src
import register from "../components/register";
import navBar from "../components/navBar";
import { getRegister } from "../firebase/colaborador";
import moment from "moment";

export default {
  name: "Home",
  components: {
    register,
    navBar
  },
  created() {
    this.$store.commit("SET_LAYOUT", "principal-layout");
    this.loadRegister();
  },
  data() {
    return {
      registerForm: false,
      value: false,
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
        { text: "Fecha", value: "date" },
        { text: "Documento", value: "documento" },
        { text: "No. Documento", value: "dni",sortable: false },
        { text: "Nombres y Apellidos", value: "nombre" },
        { text: "Celular/Fijo", value: "phone", sortable: false },
        { text: "Cargo", value: "position"},
        { text: "Área", value: "area", sortable: false },
        { text: "Negocio", value: "bussines", sortable: false },
        { text: "Cuenta", value: "account" },
        { text: "Sede", value: "sede" },
        { text: "Estado", value: "status" },
        { text: "Detalle", value: "detail", sortable: false }
      ],
      dataTable: []
    };
  },
  methods: {
    openPaciente(item) {
      console.log(item);
      this.$router.push({ name: "Expediente", params: { colaborador: item } });
    },
    loadRegister() {
      let i = 1;
      getRegister().onSnapshot(querySnapshot => {
        this.dataTable = [];
        querySnapshot.forEach(item => {
          this.dataTable.push({
            number: i,
            documento:
              item.data().typedoc == "Carnet Extranjeria"
                ? "CE"
                : item.data().typedoc,
            dni: item.data().document,
            nombre: item.data().name,
            phone: item.data().phone,
            position: item.data().position,
            bussines: item.data().bussines,
            account: item.data().account,
            sede: item.data().sede,
            status: item.data().status,
            date: item.data().date,
            edad: item.data().edad, 
            imc: item.data().imc,
            idColaborador: item.id
          });
          i++;
        });
      });
    }
  }
};
</script>
