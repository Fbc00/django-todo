<template>
  <v-container>
    <v-form>
      <v-container>
        <v-text-field
          v-model="tarefa.title"
          :counter="48"
          label="First name"
          required
        ></v-text-field>

        <v-select
          v-model="tarefa.project"
          :items="cursos"
          :rules="[(v) => !!v || 'Item is required']"
          label="Item"
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
          :to="{ name: 'TasksList', params: { atualizaTarefa: tarefa } }"
        >
          Confirmar</v-btn
        >
        <v-btn :to="{ name: 'TasksList' }">Voltar</v-btn>
      </v-container>
    </v-form>
  </v-container>
</template>

<script>
import TasksApi from "@/api/TasksApi.js";
export default {
  data: () => {
    return {
      listStatus: ["done", "pending", "working"],
      cursos: [],
      cursosId: [],
      tarefa: {
        id: "",
        title: "",
        project: "",
        status: "",
      },
    };
  },
  created() {
    TasksApi.getGroups((data) => {
      for (let curso of data) {
        this.cursos.push(curso.name);
        this.cursosId.push(curso.id);
      }
    });
    if (this.$route.params.tarefa != undefined) {
      this.tarefa.id = this.$route.params.tarefa.id;
      this.tarefa.title = this.$route.params.tarefa.title;
      this.tarefa.project = this.$route.params.tarefa.project;
      this.tarefa.status = this.$route.params.tarefa.status;
    }
  },
};
</script>
