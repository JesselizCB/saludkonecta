<template>
  <component :is="layout"></component>
</template>
<script>
import { mapState } from 'vuex';
import LoginLayout from '@/components/layouts/login';
import PrincipalLayout from '@/components/layouts/principal';

export default {
  components: { LoginLayout, PrincipalLayout },
  computed: mapState(['layout']),
};
</script>
