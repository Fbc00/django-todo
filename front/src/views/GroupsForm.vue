<template>
  <v-container
    class="d-flex align-center flex-column justify-center"
    fill-height
  >
    <div>
      <h1>Painel de controle dos grupos</h1>
    </div>
    <v-form>
      <v-container width="500px">
        <v-row>
          <v-col cols="12" md="40">
            <v-text-field
              :counter="25"
              label="Nome do Curso"
              required
              v-model="name"
            >
            </v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="40">
            <v-btn
              :to="{
                name: 'resume',
                params: { name: name },
              }"
              >Enviar</v-btn
            >
          </v-col>
        </v-row>
      </v-container>
    </v-form>
  </v-container>
</template>

<script>
export default {
  data: () => {
    return {
      name: "",
    };
  },
};
</script>
