<template>
  <v-dialog v-model="show" max-width="550px" :persistent="true">
    <v-card>
      <v-card-title class="justify-center">
        <v-row>
          <v-col cols="11" class="text-center">
            <span class="title-1 font-weight-bold teal--text">Crear Registro</span>
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
              <v-row class="ml-1 mr-1">
                <v-text-field
                  prepend-icon="ballot"
                  v-model="data.account"
                  label="Cuenta:"
                  class="sizeNoCuenta"
                  color="teal"
                  required
                  :rules="[v => !!v || 'Campo requerido']"
                ></v-text-field>
                <v-select
                  color="teal"
                  class="ml-4"
                  :items="listSede"
                  v-model="data.sede"
                  label="Sede:"
                  required
                ></v-select>
              </v-row>
              <v-row class="align-center">
                <v-select
                  prepend-icon="supervisor_account"
                  :items="listContact"
                  v-model="data.typeContact"
                  label="Tipo de contacto:"
                  class="ml-2 sizeTypeContact"
                  color="teal"
                  required
                  :rules="[v => !!v || 'Campo requerido']"
                ></v-select>
                <v-text-field
                  class="mr-3"
                  prepend-icon="perm_identity"
                  v-model="data.status"
                  label="Estado:"
                  color="teal"
                  required
                  :rules="[v => !!v || 'Campo requerido']"
                ></v-text-field>
              </v-row>
            </v-row>
          </v-container>
        </v-form>
      </v-card-text>
      <v-card-actions class="btnGuardar pb-5">
        <v-btn
          :disabled="!valid"
          color="#00968F"
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
export default {
  name: "register",
  create(){
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
    listContact: ["Presencial", "Telefonica"],
    data: 
      {
        name: "",
        typeDocument: "",
        document: "",
        account: "",
        sede: "",
        typeContact: "",
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
      console.log(this.data);
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
.sizeNoCuenta {
  margin-left: -5px;
  width: 180px;
}
.sizeTypeContact {
  width: 180px;
}
.btnGuardar {
  display: flex;
  justify-content: center;
}
.fieldCuenta {
  margin-left: 50px;
}
.iconClose {
  margin-top: -10px;
}
</style>
