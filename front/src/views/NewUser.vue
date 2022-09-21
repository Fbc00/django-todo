<template>
  <v-container class="d-flex flex-column justify-center" fill-height>
    <!-- Formulario de cadastro -->
    <v-row class="text-center">
      <v-col md="6" offset-md="3">
        <h1>
          Bem vindo ao To do List do DaniDanis, vamos fazer o seu cadastro ?
        </h1>
        <v-card class="pa-4 rounded mt-6" outlined tile width="750">
          <h2>Cadastro</h2>
          <v-form>
            <v-text-field
              v-model="name"
              label="Nome"
              required
              outlined
              append-icon="fa-user"
              v-on:keyup.enter="cadastroFeito"
            ></v-text-field>
            <v-text-field
              v-model="username"
              label="Usuário"
              required
              outlined
              append-icon="fa-user"
              v-on:keyup.enter="cadastroFeito"
            ></v-text-field>

            <v-text-field
              v-model="password"
              label="Senha"
              type="password"
              required
              outlined
              append-icon="fa-key"
              v-on:keyup.enter="cadastroFeito"
            ></v-text-field>

            <v-btn
              color="secondary"
              class="mr-4"
              x-large
              block
              @click="cadastroFeito"
              >Continuar <v-icon class="pl-3">fa-arrow-right</v-icon></v-btn
            >
          </v-form>
          <p class="ma-4">
            <span class="subtitle-1"
              >Não tenho conta! Fazer <a href="">Cadastro</a></span
            >
          </p>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import AuthApi from "@/api/auth.api.js";
export default {
  data: () => {
    return {
      name: "",
      username: "",
      password: "",
    };
  },
  methods: {
    cadastroFeito() {
      AuthApi.register(this.name, this.username, this.password).then(
        this.$router.push("/login")
      );
    },
  },
};
</script>
