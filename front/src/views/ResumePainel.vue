<template>
  <v-main class="overflow-hidden">
    <v-container class="d-flex justify-space-between" width="970">
      <v-btn
        class="align-self-start"
        color="accent"
        elevation="2"
        rounded
        x-large
        :to="{ name: 'groupsForm' }"
      >
        Adicionar
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
    <v-container class="d-flex flex-column align-center mt-16">
      <h2>Resumo das tarefas</h2>
      <v-container class="d-flex justify-center">
        <div
          v-for="item in data"
          :key="item.group"
          class="d-flex flex-column pl-6"
        >
          <h3>
            {{ item.group }} <v-chip class="ma-2"> {{ item.tasks }} </v-chip>
          </h3>
          <v-progress-circular
            :rotate="360"
            :size="100"
            :width="15"
            :value="item.percent"
            color="pink"
          >
            {{ Math.round(item.percent) }}%
          </v-progress-circular>
        </div>
      </v-container>
      <div class="my-4">
        <v-btn rounded color="primary" dark :to="{ name: 'TasksList' }">
          Ver todas tarefas
        </v-btn>
      </div>
    </v-container>
  </v-main>
</template>

<script>
import TasksApi from "@/api/TasksApi.js";
export default {
  data: () => {
    return {
      newProject: {
        id: null,
        name: "",
        userId: null,
      },
      summary: {},
      data: [],
    };
  },
  methods: {
    vaiParaInicio() {
      this.$router.push("/");
    },
    listarTarefas(nomeTarefa) {
      this.$router.push({ name: "TasksList", params: { filtro: nomeTarefa } });
    },
    cadastroGrupos() {
      this.$router.push("/groupsForm");
    },
    salvarTarefas() {
      TasksApi.getTasks((data) => {
        this.ListaDeTarefas = data;
      });
    },
    calculaQuantidade(nome) {
      return this.ListaDeTarefas.filter((titulo) =>
        titulo.project.includes(nome)
      );
    },
    getSummary() {
      TasksApi.summary().then((data) => {
        this.summary = data;
        for (const [key, value] of Object.entries(data)) {
          const totalTasks = value.pending + value.working + value.done;
          let obj = {
            group: key,
            tasks: totalTasks,
            percent: 100 - (value.pending / totalTasks) * 100,
          };
          this.data.push(obj);
        }
      });
    },
    salvaGrupo(data) {
      console.log(data);
      TasksApi.createGroups(data).then(this.getSummary());
    },
  },
  created() {
    if (this.$route.params.name) {
      this.newProject.name = this.$route.params.name;
      this.salvaGrupo(this.newProject);
    } else {
      this.getSummary();
    }
  },
};
</script>
