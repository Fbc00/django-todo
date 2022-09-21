<template>
  <v-container
    class="d-flex flex-column align-center justify-space-around"
    fill-height
  >
    <h1>To do List do DaniDanis</h1>
    <v-img
      src="../assets/ashe-chib.png"
      max-height="350"
      max-width="350"
    ></v-img>
    <v-btn x-large @click="vaiParaLogin">Iniciar</v-btn>
  </v-container>
</template>

<script>
export default {
  methods: {
    vaiParaLogin() {
      this.$router.push("/login");
    },
  },
};
</script>
