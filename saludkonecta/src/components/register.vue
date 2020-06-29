<template>
  <v-dialog v-model="show" max-width="550px" :persistent="true">
    <v-card>
      <v-card-title class="cardTitle">
        <v-row>
          <v-col cols="11" class="text-center">
            <span class="title-1 font-weight-bold colorKonecta ml-2">Crear Registro</span>
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
        <v-form ref="form" v-model="valid">
          <v-container>
            <v-row class="align-center">
              <v-text-field
                prepend-icon="account_box"
                v-model="data.name"
                label="Nombres y Apellidos:"
                color="teal"
                required
                :rules="[v => !!v || 'Campo requerido']"
              ></v-text-field>
            </v-row>
            <v-row class="align-center">
              <v-select
                prepend-icon="subtitles"
                color="teal"
                class="sizeTypeDoc"
                :items="listDocuments"
                v-model="data.typeDocument"
                label="Tipo de documento:"
              ></v-select>
              <v-text-field
                class="ml-4"
                label="No. de documento:"
                v-model="data.document"
                color="teal"
                required
                :rules="[v => !!v || 'Campo requerido']"
              ></v-text-field>
            </v-row>
            <v-row>
              <v-text-field
                prepend-icon="date_range"
                class="fieldEdad"
                label="Edad:"
                v-model="data.edad"
                color="teal"
                required
                :rules="[v => !!v || 'Campo requerido']"
              ></v-text-field>
              <v-text-field
                label="IMC:"
                class="fieldImc"
                v-model="data.imc"
                color="teal"
                required
                :rules="[v => !!v || 'Campo requerido']"
              ></v-text-field>
              <v-text-field
                prepend-icon="local_phone"
                label="Telefono:"
                v-model="data.phone"
                color="teal"
                required
                :rules="[v => !!v || 'Campo requerido']"
              ></v-text-field>
            </v-row>
            <v-row class="rowSede">
              <v-text-field
                prepend-icon="work"
                label="Puesto/Cargo:"
                v-model="data.position"
                color="teal"
                required
                class="fieldCargo"
                :rules="[v => !!v || 'Campo requerido']"
              ></v-text-field>
              <v-select
                class="fieldSede"
                prepend-icon="location_on"
                color="teal"
                :items="listSede"
                v-model="data.sede"
                label="Sede:"
                required
                :rules="[v => !!v || 'Campo requerido']"
              ></v-select>
            </v-row>
            <v-row>
              <v-select
                prepend-icon="ballot"
                color="teal"
                :items="listAccount"
                v-model="data.account"
                label="Cuenta:"
                menu-props="auto"
                hide-details
                single-line
                required
                :rules="[v => !!v || 'Campo requerido']"
              ></v-select>
            </v-row>
            <v-row class="mt-2 ml-1">
              <v-select
                class="fieldBusines"
                prepend-icon="business"
                color="teal"
                :items="listBussines"
                v-model="data.bussines"
                label="Negocio:"
                required
                :rules="[v => !!v || 'Campo requerido']"
              ></v-select>
            </v-row>
          </v-container>
        </v-form>
      </v-card-text>
      <v-card-actions class="btnGuardar pb-5">
        <v-btn
          :disabled="!valid"
          color="#f9b233"
          class="text-capitalize white--text"
          width="220"
          type="submit"
          @click="show = false, saveRegister()"
        >Guardar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { createRegister } from "../firebase/colaborador";

export default {
  name: "register",
  create() {
    this.$refs.form.reset();
  },
  data: () => ({
    valid: true,
    listSede: [
      "Callao",
      "Carabaya",
      "Chiclayo",
      "Crillón",
      "Fénix",
      "Surquillo"
    ],
    listDocuments: ["Carnet Extranjeria", "DNI", "PTP"],
    listBussines: [
      "Stratton Perú",
      "Allus Spain SL Suc Perú",
      "Konecta BTO S.L."
    ],
    listAccount: [
      "AFP INTEGRA – SURA",
      "ALICORP S.A.A",
      "BANBIF",
      "BANCO CONTINENTAL",
      "BANCO GNB PERÚ S.A.",
      "BERLITZ",
      "BRITISH TELECOM",
      "CALIDDA",
      "CENCOSUD",
      "CENCOSUD MDH",
      "CLARO CHILE",
      "CLARO PERÚ",
      "DERRAMA MAGISTERIAL",
      "DINERS",
      "ENTEL",
      "ENTEL PERÚ",
      "EXPERIENCIA AL CLIENTE Y ANALITICA",
      "FARMACIA VECINA",
      "FENOSA",
      "INNOVA SCHOOL",
      "KREALO",
      "LAN",
      "MEDIOS",
      "MOVISTAR ARGENTINA",
      "MOVISTAR CHILE",
      "MOVISTAR PERÚ",
      "ORGANIZACIÓN Y PROCEDIMIENTOS",
      "PACIFICO",
      "PERÚ CALIDAD",
      "RIMAC",
      "TRANSFORMACION DIGITAL",
      "UNICEF",
      "UNIQUE"
    ],
    data: {
      name: "",
      typeDocument: "",
      document: "",
      edad: "",
      imc: "",
      position: "",
      phone: "",
      bussines: "",
      account: "",
      sede: "",
      status: ""
    }
  }),
  props: ["visible"],
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
    saveRegister() {
      this.$refs.form.validate();
      createRegister(this.data);
      this.$refs.form.reset();
    }
  }
};
</script>
<style>
.size {
  width: 90%;
}
.sizeTypeDoc {
  width: 150px;
}
.btnGuardar {
  display: flex;
  justify-content: center;
  margin-top: -20px;
}
.iconClose {
  margin-top: -10px;
}
.fielPhone {
  width: 120px;
}
.fieldEdad {
  width: 100px;
}
.fieldImc {
  width: 120px;
  margin-left: 20px;
}
.cardTitle {
  display: flex;
  justify-content: center;
  margin-top: -15px;
}
.colorKonecta {
  color: #3bb8c4;
}
.fieldSede {
  width: 50px;
  margin-left: 8px;
}
.rowSede{
  margin-bottom: -10px;
}
.fieldCargo {
  width: 100px;
}
.fieldBusines {
  margin-left: -15px;
}
</style>
