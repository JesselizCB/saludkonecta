<template>
  <v-dialog v-model="show" max-width="400px" :persistent="true">
    <v-card>
      <v-card-title class="justify-center">
        <v-row>
          <v-col cols="11" class="text-center">
            <span class="title-1 font-weight-bold teal--text ml-3">Nuevo Seguimiento</span>
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
            <v-row>
              <v-select
                prepend-icon="supervisor_account"
                color="teal"
                :items="listContacto"
                v-model="data.contact"
                label="Contacto:"
                :rules="[v => !!v || 'Campo requerido']"
              ></v-select>
            </v-row>
            <v-row>
              <v-text-field
                prepend-icon="thermometer-lines"
                label="Temperatura"
                v-model="data.temperature"
                color="teal"
                required
                :rules="[v => !!v || 'Campo requerido']"
              ></v-text-field>
            </v-row>
            <v-row>
              <v-select
                prepend-icon="account_box"
                color="teal"
                :items="listName"
                v-model="data.name"
                label="Responsable Control de Temperatura:"
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
                placeholder="Describir los síntomas que presenta el colaborador"
                class="body-2"
              ></v-textarea>
            </v-row>
            <v-row class="black--text subtitle-1 font-weight-bold divRetiro">
              <v-icon>ballot</v-icon>
              <p class="mt-4 ml-1">Registrar Retiro anticipado</p>
            </v-row>
            <v-row  class="divRetiro2"> <span>Si el colaborador presenta síntomas que ponen en riesgo su salud.</span></v-row>
            <v-row><span class="body-2">Se registró retiro anticipado</span><v-checkbox value="retiro"></v-checkbox></v-row>
            <v-row>
              <p>Observaciones adicionales:</p>
              <v-textarea label auto-grow outlined rows="1" row-height="15" value="Describir"></v-textarea>
            </v-row>
          </v-container>
        </v-form>
      </v-card-text>
      <v-card-actions class="btnSeguimiento">
        <v-btn
          color="#00968F"
          class="text-capitalize white--text"
          width="220"
          type="submit"
          @click="show = false, saveSeguimiento()"
        >Guardar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "register",
  data: () => ({
    valid: true,
    listContacto: ["Virtual", "Telefónica"],
    listName: ["Maray Montes", "Armando"],
    listDocuments: ["Carnet Extranjeria", "DNI", "PTP"],
    valueSede: "",
    listDocumentsValue: "",
    data: [
      {
        name: "",
        typeDocument: "",
        document: "",
        account: "",
        sede: "",
        typeContact: "",
        status: ""
      }
    ]
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
    saveSeguimiento() {
      this.$refs.form.validate();
      this.$refs.form.reset();
      this.$router.replace({ path: "/details" });
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
.btnGuardar {
  display: flex;
  justify-content: center;
  margin-top: -30px;
}
.iconClose {
  margin-top: -10px;
}
.textField{
  margin-top: -50px;
}
.divRetiro{
  margin-top: -20px;
}
.divRetiro2{
  margin-top: -15px;
}
</style>
