<template>
  <v-container >
    <v-row class="text-center">
    <v-col md="6" offset-md="3"  >
        <v-card min-width="500px" class="pa-4 card"
       >
        <v-card-title>
            Login
        </v-card-title>
        <v-text-field label="Usuário"
        v-model="username"
        outlined>
        </v-text-field>
        <v-text-field label="Senha" type="password"
        append-icon="fa-key"
        v-model="password"
        @keyup.enter="login"
        outlined
        >
        </v-text-field>

        <v-btn color="primary" large block @click="login" >
            Continuar
        </v-btn>

        <v-card-text> Não tenho conta! Fazer <a href="/register" >Cadastro</a></v-card-text>
    </v-card>
    </v-col>
</v-row>
   
  </v-container>
</template>

<script>


import instancia from "@/api/instancia";
export default {
  data: () => {
    return {
      username: '',
      password: '',
    }
  },
  methods: {
    apiLogin () {
      const data = {
        username: this.username,
        password: this.password,
      }
      const formData = new FormData()
      for (const k of Object.keys(data)) {
        formData.append(k, data[k])
      }
      return new Promise((resolve, reject) => {
        instancia
          .post('/api/login', formData)
          .then((response) => {
            this.$router.push({name: 'taskList'})
            return resolve(response.data)
          })
          .catch((error) => {
            return reject(error)
          })
      })
    },
    login () {
      this.apiLogin()
        .then((user) => {
          // salva apenas para caso precise exibir no app bar
          // nao precisa pegar para fazer request
          localStorage.setItem('loggedUser', JSON.stringify(user))
          console.log('logado!')
        })
        .catch((error) => {
          console.log('Usuario ou senha invalida', error)
        })
    },
  }
}
</script>

<style scoped>
    .main {
        display: flex;
        flex-direction: column;
        justify-content: center;
        height: 100%;
    }
    .card {
        padding: 1rem;

    }
</style>