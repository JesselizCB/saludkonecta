<template>
  <v-dialog v-model="show" max-width="400px" :persistent="true">
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
            <v-row>
              <v-select
                prepend-icon="supervisor_account"
                color="teal"
                :items="listContacto"
                v-model="data.typeContact"
                label="Contacto:"
                :rules="[v => !!v || 'Campo requerido']"
              ></v-select>
            </v-row>
            <v-row>
              <v-text-field
                prepend-icon="wb_incandescent"
                label="Temperatura"
                v-model="data.temperature"
                color="teal"
                required
                :rules="[v => !!v || 'Campo requerido']"
              ></v-text-field>
            </v-row>
            <v-row>
              <p class="black--text body-1 ml-1 font-weight-bold black--text">Responsable Control de Temperatura:</p>
              <v-row class="fieldDoctor">
                <v-icon class="mt-2 ml-3">account_box</v-icon>
                <p class="mt-6 ml-2 body-2 black--text">Lizeth Cersso</p>
              </v-row>
              <!-- <v-text-field
                prepend-icon="account_box"
                color="teal"
                readonly
                value="Lizeth Cersso"
                label="Responsable Control de Temperatura:"
              ></v-text-field>-->
            </v-row>
            <v-row>
              <v-select
                :items="statusList"
                prepend-icon="perm_identity"
                v-model="data.status"
                label="Estado:"
                color="teal"
                required
                :rules="[v => !!v || 'Campo requerido']"
              ></v-select>
            </v-row>
            <v-row class="black--text subtitle-1 font-weight-bold">
              <v-icon>ballot</v-icon>
              <p class="mt-4 ml-1">Test Rápido:</p>
            </v-row>
            <v-row>
              <v-textarea
                color="teal"
                label
                auto-grow
                outlined
                rows="1"
                row-height="15"
                placeholder="Describir síntomas que presenta el colaborador"
                class="body-2"
                v-model="data.observaciones_1"
              ></v-textarea>
            </v-row>
            <v-row class="black--text subtitle-1 font-weight-bold divRetiro">
              <v-icon>ballot</v-icon>
              <p class="mt-4 ml-2">Registrar Retiro anticipado</p>
            </v-row>
            <v-row class="divRetiro2">
              <span>Si el colaborador presenta síntomas que ponen en riesgo su salud.</span>
            </v-row>
            <v-row class="mt-1">
              <input class="fieldCheck" type="checkbox" id="checkbox" v-model="data.retiro" />
              <span class="body-2 ml-1">Se registró retiro anticipado</span>
            </v-row>
            <v-row class="mt-5">
              <p class="black--text subtitle-2 font-weight-bold">Observaciones adicionales:</p>
              <v-textarea
                :disabled="!data.retiro"
                color="teal"
                label
                auto-grow
                outlined
                rows="1"
                row-height="15"
                placeholder="Describir"
                class="body-2"
                v-model="data.observaciones_2"
              ></v-textarea>
            </v-row>
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

export default {
  name: "seguimiento",
  props: ["visible", "idColaborador"],
  created() {
    this.cleanForm();
  },
  data: () => ({
    valid: true,
    listContacto: ["Presencial", "Telefónica"],
    listName: ["Maray Montes", "Armando"],
    listDocuments: ["Carnet Extranjeria", "DNI", "PTP"],
    statusList: [
      "Acreditado",
      "Fallecido",
      "Hospitalizado",
      "Negativo",
      "Recuperado",
      "Sospechoso"
    ],
    data: {
      idColaborador: "",
      typeContact: "",
      temperature: "",
      status: "",
      observaciones_1: "",
      retiro: false,
      observaciones_2: ""
    }
  }),
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
    saveSeguimiento() {
      this.$refs.form.validate();
      this.data.idColaborador = this.idColaborador;
      createSeguimiento(this.data);
      this.cleanForm();
    },
    cleanForm() {
      this.$refs.form.reset();
      this.data.retiro = false;
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
.fieldCheck {
  margin-top: 4px;
}
.colorKonecta {
  color: #3bb8c4;
}
.fieldDoctor{
  margin-top:-35px;
}
</style>
