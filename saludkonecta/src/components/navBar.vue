<template>
    <v-app-bar color="teal accent-4" dense dark>
        <v-app-bar-nav-icon>
          <v-icon>{{icon}}</v-icon>
        </v-app-bar-nav-icon>
        <v-toolbar-title>{{title}}</v-toolbar-title>
        <v-spacer></v-spacer>
        <div class = "btnBack" v-if="enable">
        <v-btn icon @click="toBack()">
          <v-icon>keyboard_arrow_left</v-icon>
          <span class="subtitle-2">Regresar</span>
        </v-btn>
        </div>
      </v-app-bar>
</template>

<script>
export default {
  name: 'navBar',

  data: () => ({
    
  }),
  props: {
      title: {
            type: String,
            required: true
        },
        enable: {
            type: Boolean,
            required: false,
        },
        icon: {
            type: String,
            required: false,
        }
  },
   methods: {
    toBack() {
      this.$router.replace({ path: "/Home" });
    }
  }
};
</script>
<style>
.btnBack{
    width: 120px;
    font-size: 10px;
}
</style>