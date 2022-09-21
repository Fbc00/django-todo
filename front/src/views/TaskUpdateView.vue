<template>
    <v-container class="container">

          <v-card min-width="700" :loading="loading" elevation="4">
            <v-col>
                  <v-card-title> Editar Task {{ task.id }} </v-card-title>
                  <v-text-field label="Titulo" outlined v-model="task.title"></v-text-field>
                  <v-text-field label="Projeto" outlined v-model="task.project"></v-text-field>
                  <v-text-field label="Usuario" outlined v-model="task.usuario"></v-text-field>
                  <v-btn color="primary" large @click="EnviaForm"> <v-icon> fa-solid fa-check </v-icon> </v-btn>
                  <v-btn color="error" large :to="{name: 'taskList'}"> <v-icon> fa-solid fa-xmark </v-icon></v-btn>
                </v-col>
          </v-card>
    </v-container>
</template>

<script>
  import editTask from '@/api/queries'
export default {
  data() {
    return {
      loading: false,
      task: {
        id: '',
        title: '',
        project: '',
        usuario: '',
      }
    }
  },
  methods: {
    EnviaForm() {
      this.loading = true
      editTask.editTask(this.task, callback => {
        setTimeout(() => {
          this.loading= false
          this.$router.push({ name: 'taskList' })
        }, 2000)
        console.log(callback)
      })
    }
  },
  created() {
    this.task = {
      id: this.$route.params.id,
      title: this.$route.query.title,
      project: this.$route.query.project,
      usuario: this.$route.query.usuario,
    } 
  },
}
</script>

<style scoped>
  button {
    margin: 10px;
  }
  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: calc(100vh - 130px);
  }

</style>