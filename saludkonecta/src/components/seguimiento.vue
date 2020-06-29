<template>
  <v-dialog v-model="show" max-width="550px" :persistent="true">
    <v-card>
      <v-card-title class="cardTitle">
        <v-row>
          <v-col cols="11" class="text-center">
            <span class="title-1 font-weight-bold ml-3 colorKonecta">Nuevo Seguimiento</span>
          </v-col>
          <v-col cols="1" class="iconClose">
            <v-icon @click="show = false, cleanForm()">highlight_off</v-icon>
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
                :items="statusList"
                prepend-icon="perm_identity"
                v-model="data.status"
                label="Estado:"
                color="teal"
                class="fieldStatus"
                required
                :rules="[v => !!v || 'Campo requerido']"
              ></v-select>
              <v-text-field
                prepend-icon="wb_incandescent"
                label="Temperatura"
                v-model="data.temperature"
                class="fieldTemp"
                color="teal"
                required
                :rules="[v => !!v || 'Campo requerido']"
              ></v-text-field>
            </v-row>
            <v-row>
              <v-select
                prepend-icon="supervisor_account"
                color="teal"
                :items="listContacto"
                v-model="data.typeContact"
                label="Tipo de Incidencia:"
                :rules="[v => !!v || 'Campo requerido']"
              ></v-select>
            </v-row>
            <v-row class="mt-3 justify-space-between">
              <v-row class="ml-1">
                <input class="fieldCheck" type="checkbox" id="checkbox1" v-model="data.riesgo" />
                <span class="fieldCheck1">Factor de Riesgo</span>
              </v-row>
              <v-row class="justify-center">
                <input class="fieldCheck" type="checkbox" id="checkbox2" v-model="data.antecedente" />
                <span class="fieldCheck1">Antecedente Epidemiológico</span>
              </v-row>
            </v-row>
            <v-row class="mt-2">
              <v-select
                prepend-icon="enhanced_encryption"
                color="teal"
                :items="listEvolucion"
                v-model="data.evolucion"
                label="Evolución médica:"
                :rules="[v => !!v || 'Campo requerido']"
              ></v-select>
            </v-row>
            <v-row class="justify-center" v-if="data.evolucion === 'Aislamiento'">
              <div class="fieldDateA">
                <v-menu v-model="menu2" :close-on-content-click="false" max-width="290">
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      prepend-icon="calendar_today"
                      :value="computedDateFormattedMomentjs2"
                      clearable
                      label="Aislamiento desde:"
                      readonly
                      v-on="on"
                      color="teal"
                      @click:clear="dateBeginA = null"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    locale="ES-es"
                    color="teal"
                    no-title
                    v-model="dateBeginA"
                    @change="menu2 = false"
                  ></v-date-picker>
                </v-menu>
              </div>
              <div>
                <v-menu v-model="menu3" :close-on-content-click="false" max-width="290">
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      prepend-icon="calendar_today"
                      :value="computedDateFormattedMomentjs3"
                      clearable
                      label="Aislamiento hasta:"
                      readonly
                      v-on="on"
                      color="teal"
                      @click:clear="dateEndA = null"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    locale="ES-es"
                    color="teal"
                    no-title
                    v-model="dateEndA"
                    @change="menu3 = false"
                  ></v-date-picker>
                </v-menu>
              </div>
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
              class="body-2"
              v-model="data.observaciones"
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
          @click="show = false,saveSeguimiento()"
        >Guardar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { createSeguimiento } from "../firebase/colaborador";
import moment from "moment";

export default {
  name: "seguimiento",
  props: ["visible", "idColaborador"],
  data() {
    return {
      valid: true,
      menu1: false,
      menu2: false,
      menu3: false,
      date: new Date().toISOString().substr(0, 10),
      dateBeginA: new Date().toISOString().substr(0, 10),
      dateEndA: new Date().toISOString().substr(0, 10),
      listContacto: [
        "Detección al ingreso",
        "Detección mientras laboraba",
        "Comunicación telefónica previo a inicio de labores",
        "Correo electrónico"
      ],
      listDocuments: ["Carnet Extranjeria", "DNI", "PTP"],
      statusList: ["Sospechoso", "Confirmado", "Recuperado"],
      listEvolucion: [
        "Aislamiento",
        "Alta médica",
        "Fallecido",
        "Hospitalizado",
        "Alta de termino por cuarentena"
      ],
      listPrueba: ["Molecular", "Rápida"],
      listMolecular: ["Positivo", "Negativo"],
      listRapida: [
        "Ig M no reactivo Ig G no reactivo",
        "Ig M reactivo Ig G no reactivo",
        "Ig M reactivo Ig G reactivo",
        "Ig M no reactivo Ig G reactivo"
      ],
      data: {
        idColaborador: "",
        fecha: "",
        dateBeginA: "",
        dateEndA: "",
        typeContact: "",
        temperature: "",
        status: "",
        riesgo: false,
        antecedente: false,
        evolucion: "",
        observaciones: ""
      }
    };
  },
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
    },
    computedDateFormattedMomentjs() {
      return this.date ? moment(this.date).format("DD/MM/YYYY") : "";
    },
    computedDateFormattedMomentjs2() {
      return this.dateBeginA
        ? moment(this.dateBeginA).format("DD/MM/YYYY")
        : "";
    },
    computedDateFormattedMomentjs3() {
      return this.dateEndA ? moment(this.dateEndA).format("DD/MM/YYYY") : "";
    }
  },
  methods: {
    saveSeguimiento() {
      this.$refs.form.validate();
      this.data.idColaborador = this.idColaborador;
      this.data.fecha = moment(this.date).format("DD/MM/YYYY");
      console.log(this.dateBeginA);
      console.log(this.dateEndA);
      if (this.data.evolucion === "Aislamiento") {
        this.data.dateBeginA = moment(this.dateBeginA).format("DD/MM/YYYY");
        this.data.dateEndA = moment(this.dateEndA).format("DD/MM/YYYY");
      } else {
        this.data.dateBeginA = "-";
        this.data.dateEndA = "-";
      }
      console.log(this.data);
      
      createSeguimiento(this.data);
      this.cleanForm();
    },
    cleanForm() {
      this.$refs.form.reset();
      this.data.antecedente = false;
      this.data.riesgo = false;
    }
  }
};
</script>
<style>
.size {
  width: 90%;
}
.typeDoc {
  width: 150px;
}
.btnSeguimiento {
  display: flex;
  justify-content: center;
  margin-top: -30px;
}
.iconClose {
  margin-top: -10px;
}
.textField {
  margin-top: -50px;
}
.divRetiro {
  margin-top: -20px;
}
.divRetiro2 {
  margin-top: -15px;
}
.cardTitle {
  display: flex;
  justify-content: center;
  margin-top: -15px;
}
.fieldCheck1 {
  font-size: 15px;
  margin-top: -4px;
  margin-left: 8px;
  color: black;
}
.colorKonecta {
  color: #3bb8c4;
}
.fieldTemp {
  width: 30px;
}
.fieldStatus {
  width: 100px;
}
.fieldPrueba {
  width: 50px;
}
.fieldDateA {
  width: 220px;
}
</style>
