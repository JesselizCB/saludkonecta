<template>
  <div>
    <navBar icon="account_circle" :title="colaborador.nombre" :enable="linkBack"></navBar>
    <v-container>
      <v-row class="justify-space-between mt-4">
        <v-col cols="6">
          <v-card outlined class="px-5">
            <v-container>
              <v-row>
                <v-col>
                  <p class="font-weight-bold">Documento: <span class="grey--text">{{colaborador.documento}}</span></p>
                  <p class="font-weight-bold">Cuenta: <span class="grey--text">{{colaborador.account}}</span></p>
                  <p class="font-weight-bold">Telefono: <span class="grey--text">{{colaborador.phone}}</span></p>
                </v-col>
                <v-col>
                  <p class="font-weight-bold">No.: <span class="grey--text">{{colaborador.dni}}</span></p>
                  <p class="font-weight-bold">Sede: <span class="grey--text">{{colaborador.sede}}</span></p>
                  <p class="font-weight-bold">Estado: <span class="grey--text">{{colaborador.status}}</span></p>
                </v-col>
              </v-row>
            </v-container>
          </v-card>
        </v-col>
        <v-col cols="4" class="text-end">
          <v-btn color="teal accent-4 white--text" @click.stop="seguimientoForm=true">
            Añadir seguimiento
            <v-icon right class="white--text">add_circle_outline</v-icon>
          </v-btn>
          <seguimiento :visible="seguimientoForm" :idColaborador="colaborador.idColaborador" @close="seguimientoForm=false"></seguimiento>
          <v-text-field
            v-model="search"
            append-icon="search"
            label="Buscar"
            single-line
            hide-details
            class="fieldSearch"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row class="justify-center mt-5">
        <v-col cols="11">
          <v-data-table
            :headers="headers"
            :items="dataTable"
            :search="search"
            :sort-by="['date']"
            :sort-desc="[false, true]"
            multi-sort
            class="elevation-1"
          ></v-data-table>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
// @ is an alias to /src
import seguimiento from "../components/seguimiento";
import navBar from "../components/navBar";
import { getSeguimiento } from "../firebase/colaborador";

export default {
  name: "Expediente",
  created() {
    this.$store.commit("SET_LAYOUT", "principal-layout");
    console.log(this.colaborador.idColaborador);
    this.loadTable();
  },
  components: {
    seguimiento,
    navBar
  },
  props: {
    colaborador: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      seguimientoForm: false,
      linkBack: true,
      search: "",

      headers: [
        {
          text: "N°",
          align: "start",
          sortable: false,
          value: "number"
        },
        { text: "Fecha y hora", value: "date" },
        { text: "Contacto", value: "contact", sortable: false },
        { text: "Estado", value: "status", sortable: false },
        { text: "Observación-1", value: "information_1", sortable: false },
        { text: "Retiro", value: "retiro", sortable: false },
        { text: "Observacion-2", value: "information_2", sortable: false }
      ],
      dataTable: [],
    };
  },
  methods: {
    toBack() {
      this.$router.replace({ path: "/Home" });
    },
     loadTable(){
      let i = 1;
      console.log(this.colaborador.idColaborador);      
      getSeguimiento(this.colaborador.idColaborador).onSnapshot(querySnapshot => {
        this.dataTable = [];
         querySnapshot.forEach(item => {
           console.log(item.data());
          this.dataTable.push({
            number: i,
            date: item.data().date,
            days: "5",
            contact: item.data().typeContact,
            status: item.data().status,
            information_1: item.data().information_1,
            retiro: item.data().retiro,
            information_2: item.data().information_2,
          })
          i++;
        }); 
      });
    }  
  }
};
</script>
<style>
.fieldSearch {
  margin-top: 100px;
}
</style>