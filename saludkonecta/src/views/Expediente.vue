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
                  <p class="font-weight-bold">
                    Documento:
                    <span class="grey--text">{{colaborador.documento}}</span>
                  </p>
                  <p class="font-weight-bold">
                    Edad:
                    <span class="grey--text">{{colaborador.edad}}</span>
                  </p>
                  <p class="font-weight-bold">
                    Telefono:
                    <span class="grey--text">{{colaborador.phone}}</span>
                  </p>
                </v-col>
                <v-col>
                  <p class="font-weight-bold">
                    No.:
                    <span class="grey--text">{{colaborador.dni}}</span>
                  </p>
                  <p class="font-weight-bold">
                    IMC:
                    <span class="grey--text">{{colaborador.imc}}</span>
                  </p>
                  <p class="font-weight-bold">
                    Estado:
                    <span class="grey--text">{{colaborador.status}}</span>
                  </p>
                </v-col>
              </v-row>
              <v-row class=" ml-1">
                <p class="font-weight-bold" v-if="dataTable.length != 0">
                  Factores de riesgo:
                  <span class="grey--text" v-if="colaborador.hta ==`Si`">HTA,</span>
                  <span class="grey--text" v-if="colaborador.diabetes ==`Si`"> Diabetes,</span>
                  <span class="grey--text" v-if="colaborador.asma ==`Si`"> Asma,</span>
                  <span class="grey--text" v-if="colaborador.respiratoria ==`Si`"> Enf. Respiratoria crónica,</span>
                  <span class="grey--text" v-if="colaborador.cardiovascular ==`Si`"> Enf. Cardiovascular,</span>
                  <span class="grey--text" v-if="colaborador.obesidad ==`Si`"> Obesidad,</span>
                  <span class="grey--text" v-if="colaborador.cancer ==`Si`"> Cancer,</span>
                  <span class="grey--text" v-if="colaborador.inmunosuprimido ==`Si`"> Inmunosuprimido,</span>
                  <span class="grey--text" v-if="colaborador.renal ==`Si`"> Insuficiencia renal crónica</span>
                </p>
              </v-row>
              <v-row class="ml-1">
                <p class="font-weight-bold" v-if="dataTable.length != 0">
                  Antecedente Epidemiológico:
                  <span class="grey--text" v-if="colaborador.antecedente ==`Si`"> Si</span>
                  <span class="grey--text" v-else> No</span>
                </p>
              </v-row>
            </v-container>
          </v-card>
        </v-col>
        <v-col cols="4" class="text-end">
          <v-btn color="#3bb8c4" class="white--text" @click.stop="seguimientoForm=true">
            Añadir seguimiento
            <v-icon right class="white--text">add_circle_outline</v-icon>
          </v-btn>
          <seguimiento
            :visible="seguimientoForm"
            :idColaborador="colaborador.idColaborador"
            :sendDataFactor="showFactor"
            :total="dataTable.length"
            @close="seguimientoForm=false"
          ></seguimiento>
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
        <v-col cols="12">
          <v-data-table
            :headers="headers"
            :items="dataTable"
            :search="search"
            :sort-by="['date']"
            multi-sort
            class="elevation-1"
          >
            <template v-slot:item.addprueba="{ item }">
              <v-btn x-small color="#f9b233" class="white--text" @click="openPrueba(item)">Adicionar</v-btn>
            </template>
            <template v-slot:item.listprueba="{ item }">
              <v-btn
                v-if="item.pruebas != 0"
                x-small
                color="#f9b233"
                class="white--text"
                @click.stop="showPruebas(item)"
              >Listar</v-btn>
            </template>
          </v-data-table>
        </v-col>
      </v-row>
    </v-container>
    <listPruebas :visible="pruebasForm" :listTest="dataTest" @close="pruebasForm=false"></listPruebas>
    <!-- Dialogo Prueba -->
    <v-dialog v-model="pruebaForm" max-width="400px" :persistent="true">
      <v-card>
        <v-card-title class="cardTitle">
          <v-row>
            <v-col cols="11" class="text-center">
              <span class="title-1 font-weight-bold ml-3 colorKonecta">Nueva Prueba</span>
            </v-col>
            <v-col cols="1" class="iconClose">
              <v-icon @click="pruebaForm = false, cleanForm()">highlight_off</v-icon>
            </v-col>
          </v-row>
          <v-row class="size">
            <v-divider></v-divider>
          </v-row>
        </v-card-title>
        <v-card-text>
          <v-form ref="form" v-model="valid">
            <v-container>
              <v-row class="justify-center">
                <v-menu v-model="menu1" :close-on-content-click="false" max-width="290">
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      prepend-icon="calendar_today"
                      :value="computedDateFormattedMomentjs"
                      clearable
                      label="Seleccione la Fecha:"
                      readonly
                      v-on="on"
                      color="teal"
                      @click:clear="date = null"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    locale="ES-es"
                    color="teal"
                    no-title
                    v-model="date"
                    @change="menu1 = false"
                  ></v-date-picker>
                </v-menu>
              </v-row>
              <v-row>
                <v-select
                  prepend-icon="assignment"
                  color="teal"
                  :items="listPrueba"
                  v-model="dataP.prueba"
                  label="Tipo de prueba:"
                  class="fieldPrueba"
                  :rules="[v => !!v || 'Campo requerido']"
                ></v-select>
              </v-row>
              <v-row>
                <v-select
                  v-if="dataP.prueba === 'Molecular'"
                  prepend-icon="assignment_turned_in"
                  color="teal"
                  :items="listMolecular"
                  v-model="dataP.result"
                  label="Resultado:"
                  class="fieldResult"
                  :rules="[v => !!v || 'Campo requerido']"
                ></v-select>
                <v-select
                  v-else
                  prepend-icon="assignment_turned_in"
                  color="teal"
                  :items="listRapida"
                  v-model="dataP.result"
                  label="Resultado:"
                  class="fieldResult"
                  :rules="[v => !!v || 'Campo requerido']"
                ></v-select>
              </v-row>
              <p class="black--text subtitle-2 font-weight-bold">Observaciones adicionales:</p>
              <v-textarea
                color="teal"
                label
                auto-grow
                outlined
                rows="1"
                row-height="15"
                placeholder="Describir"
                v-model="dataP.observaciones"
              ></v-textarea>
            </v-container>
          </v-form>
        </v-card-text>
        <v-card-actions class="btnSeguimiento pb-5">
          <v-btn
            :disabled="!valid"
            color="#f9b233"
            class="text-capitalize white--text"
            width="220"
            type="submit"
            @click="pruebaForm = false,savePrueba()"
          >Guardar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- Dialogo Prueba -->
  </div>
</template>

<script>
// @ is an alias to /src
import seguimiento from "../components/seguimiento";
import navBar from "../components/navBar";
import listPruebas from "../components/pruebas";
import moment from "moment";
import {
  getSeguimiento,
  createPrueba,
  getPruebas
} from "../firebase/colaborador";

export default {
  name: "Expediente",
  created() {
    this.$store.commit("SET_LAYOUT", "principal-layout");
    this.loadTable();
  },
  components: {
    seguimiento,
    navBar,
    listPruebas
  },
  props: {
    colaborador: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      valid: true,
      pruebaForm: false,
      pruebasForm: false,
      seguimientoForm: false,
      linkBack: true,
      menu1: false,
      date: new Date().toISOString().substr(0, 10),
      dataTest: [],
      search: "",
      arrayUser: [],
      headers: [
        {
          text: "N°",
          align: "start",
          sortable: false,
          value: "number"
        },
        { text: "Fecha", value: "date" },
        { text: "Contacto", value: "contact" },
        { text: "Estado", value: "status" },
        { text: "Pruebas", value: "pruebas" },
        { text: "Evolución", value: "evolucion" },
        { text: "Aislamiento desde", value: "dateBeginA" },
        { text: "Aislamiento hasta", value: "dateEndA" },
        { text: "Observaciones", value: "information", sortable: false },
        { text: "Adicionar Prueba", value: "addprueba", sortable: false },
        { text: "Listar Prueba", value: "listprueba", sortable: false }
      ],
      dataTable: [],
      listPrueba: ["Molecular", "Rápida"],
      listMolecular: ["Positivo", "Negativo"],
      listRapida: [
        "Ig M no reactivo Ig G no reactivo",
        "Ig M reactivo Ig G no reactivo",
        "Ig M reactivo Ig G reactivo",
        "Ig M no reactivo Ig G reactivo"
      ],
      dataP: {
        idColaborador: this.colaborador.idColaborador,
        idSeguimiento: "",
        fecha: "",
        prueba: "",
        result: "",
        observaciones: ""
      }
    };
  },
  computed: {
    computedDateFormattedMomentjs() {
      return this.date ? moment(this.date).format("DD/MM/YYYY") : "";
    }
  },
  methods: {
    toBack() {
      this.$router.replace({ path: "/Home" });
    },
    cleanForm() {
      this.$refs.form.reset();
    },
    openPrueba(item) {
      this.pruebaForm = true;
      this.dataP.idSeguimiento = item.idSeguimiento;
    },
    savePrueba() {
      this.dataP.fecha = this.date;
      createPrueba(this.dataP);
      this.cleanForm();
    },
    loadTable() {
      getSeguimiento(this.colaborador.idColaborador).onSnapshot(
        querySnapshot => {
          let i = 1;
          this.dataTable = [];
          querySnapshot.forEach(item => {
            this.dataTable.push({
              number: i,
              date: item.data().date,
              days: "5",
              contact: item.data().typeContact,
              status: item.data().status,
              riesgo: item.data().riesgo,
              evolucion: item.data().evolucion,
              dateBeginA: item.data().dateBeginA,
              dateEndA: item.data().dateEndA,
              pruebas: item.data().pruebas,
              information: item.data().observaciones,
              idSeguimiento: item.id
            });
            i++;
          });
          let index = this.dataTable.length;
          if (index != 0) {
            this.colaborador.status = this.dataTable[index - 1].status;
          }
        }
      );
    },
    showPruebas(item) {
      getPruebas(item.idSeguimiento).onSnapshot(querySnapshot => {
        this.dataTest = [];
        querySnapshot.forEach(item => {
          this.dataTest.push({
            date: item.data().date,
            prueba: item.data().prueba,
            result: item.data().result
          });
        });
      });
      this.dataTest = this.dataTest.sort(
        (a, b) => parseInt(a.date) - parseInt(b.date)
      );
      this.pruebasForm = true;
    },
    showFactor(data){
      this.colaborador.antecedente = (data.antecedente)?"Si":"No";
      this.colaborador.hta = (data.hta)?"Si":"No";
      this.colaborador.diabetes = (data.diabetes)?"Si":"No";
      this.colaborador.asma = (data.asma)?"Si":"No";
      this.colaborador.respiratoria = (data.respiratoria)?"Si":"No";
      this.colaborador.cardiovascular = (data.cardiovascular)?"Si":"No";
      this.colaborador.obesidad = (data.obesidad)?"Si":"No";
      this.colaborador.cancer = (data.cancer)?"Si":"No";
      this.colaborador.inmunosuprimido = (data.inmunosuprimido)?"Si":"No";
      this.colaborador.renal = (data.renal)?"Si":"No";
    }
  }
};
</script>
<style>
.fieldSearch {
  margin-top: 100px;
}
.fieldResult {
  margin-left: -1px;
}
.fieldBussines,
.fieldArea {
  width: 100%;
  padding-left: 10px;
}
.fieldArea {
  margin-top: -10px;
}

</style>