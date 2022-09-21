<template>
  <v-container>
    <h1>Nova Task</h1>
    <v-form>
      <v-container>
        <v-text-field
          v-model="tarefa.title"
          :counter="48"
          label="Titulo da tarefa"
          required
        ></v-text-field>

        <v-select
          v-model="tarefa.project"
          :items="cursos"
          label="Grupo da tarefa"
          required
        ></v-select>
        <v-select
          v-model="tarefa.status"
          :items="listStatus"
          label="Status"
          required
        ></v-select>

        <v-btn
          color="success"
          class="mr-4"
          :to="{ name: 'TasksList', params: { task: tarefa } }"
        >
          Confirmar</v-btn
        >
        <v-btn @click="voltaParaTasksList">Voltar</v-btn>
      </v-container>
    </v-form>
    <h1>Não encotrou um grupo de tarefa desejado ?</h1>
    <v-btn :to="{ name: 'groupsForm' }">Criar um novo grupo de tarefa</v-btn>
  </v-container>
</template>

<script>
import TasksApi from "@/api/TasksApi";
export default {
  data: () => {
    return {
      cursos: [],
      cursosId: [],
      listStatus: ["done", "pending", "working"],
      tarefa: {
        title: "",
        project: "",
        status: "",
      },
    };
  },
  methods: {
    voltaParaTasksList() {
      this.$router.push("/tasksList");
    },
  },
  created() {
    TasksApi.getGroups((data) => {
      for (let curso of data) {
        this.cursos.push(curso.name);
        this.cursosId.push(curso.id);
      }
    });
  },
};
</script>
