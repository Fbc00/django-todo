<template>
  <v-container class="d-flex flex-column align-center">
    <v-container class="d-flex justify-space-between" width="970">
      <v-btn
        class="align-self-start"
        color="accent"
        elevation="2"
        rounded
        x-large
        :to="{ name: 'addTask' }"
      >
        Adicionar
      </v-btn>
      <v-btn
        class="align-self-end"
        color="accent"
        elevation="2"
        rounded
        x-large
        :to="{ name: 'resume' }"
      >
        Voltar
      </v-btn>
      <v-btn
        class="align-self-end"
        color="accent"
        elevation="2"
        rounded
        x-large
        @click="vaiParaInicio"
      >
        Logout
      </v-btn>
    </v-container>
    <h1>Lista de Tarefas</h1>
    <v-select
      v-model="filtro"
      :items="filtroGrupos"
      label="Filtrar por grupo"
    ></v-select>
    <li class="d-flex flex-column">
      <ul
        v-for="tarefa in filtragem"
        :key="tarefa.id"
        class="d-flex mt-8"
        fill-heigth
      >
        <v-card width="550" class="pink lighten-4">
          <v-card-title>
            {{ tarefa.title }} -- {{ tarefa.status }}
          </v-card-title>
          <v-card-subtitle>
            {{ tarefa.project }}
          </v-card-subtitle>
          <v-card-text>
            {{ tarefa.date }}
          </v-card-text>
          <v-card-actions>
            <v-btn
              :to="{
                name: 'taskUpdate',
                params: { id: tarefa.id, tarefa: tarefa },
              }"
            >
              Editar
            </v-btn>
            <v-btn @click="deletarTask(tarefa.id)">Excluir</v-btn>
          </v-card-actions>
        </v-card>
      </ul>
    </li>
  </v-container>
</template>

<script>
import TasksApi from "@/api/TasksApi.js";
export default {
  data: () => {
    return {
      filtroGrupos: [""],
      ListaDeTarefas: [],
      loading: false,
      filtro: "",
      exibir: {
        formGroups: false,
        listaGroups: true,
      },
    };
  },
  methods: {
    listarTarefas() {
      TasksApi.getTasks((data) => {
        this.ListaDeTarefas = data;
      });
    },
    vaiParaInicio() {
      this.$router.push("/");
    },
    vaiParaAdicionar() {
      this.$router.push("/newTask");
    },
    deletarTask(id) {
      TasksApi.delTasks(id, () => {
        this.listarTarefas();
      });
    },
    adicionarTask(task) {
      TasksApi.addTasks(task, () => {
        this.listarTarefas();
      });
    },
    atualizaTask(task) {
      console.log(task);
      TasksApi.updateTask(task, () => {
        this.listarTarefas();
      });
    },
    filtrandoGrupos() {
      TasksApi.getGroups((data) => {
        for (let curso of data) {
          this.filtroGrupos.push(curso.name);
        }
      });
    },
  },
  created() {
    this.filtrandoGrupos();
    if (
      this.$route.params.task != undefined &&
      this.$route.params.task.title != "" &&
      this.$route.params.task.project != ""
    ) {
      this.adicionarTask(this.$route.params.task);
    } else {
      this.filtro = this.$route.params.filtro || "";
      this.listarTarefas();
    }
    if (this.$route.params.atualizaTarefa != undefined) {
      this.atualizaTask(this.$route.params.atualizaTarefa);
    }
  },
  computed: {
    filtragem() {
      return this.ListaDeTarefas.filter((titulo) =>
        titulo.project.includes(this.filtro)
      );
    },
  },
};
</script>
