<template>
    <v-dialog
     v-model="dialog"
     width="500"
   >
     <v-card>
         <v-card-title>
                 <span class="text-h5">Nova Tarefa</span>
         </v-card-title>
         <v-spacer></v-spacer>
         <v-container>
         <v-row>
           <v-col>
                   <v-text-field
                   label="Usuário"
                   v-model="newtask.user"
                   >
                   </v-text-field>
                 </v-col>
         <v-col cols="12">
                   <v-text-field
                     label="Title*"
                     required
                     v-model="newtask.title"
                   ></v-text-field>
                 </v-col>
                 <v-col cols="12">
                   <v-text-field
                     label="Project*"
                     v-model="newtask.project"
                     required
                   ></v-text-field>
                 </v-col>
                 <v-btn style="color: white;" class="ma-4"
                 x-large
                 color="pink lighten-2"
                 @click="addNewTask"> Confirmar</v-btn>
               </v-row>
             </v-container>
     </v-card>
   </v-dialog>
 
</template>
 
 <script>
 import queries from '@/api/queries'
 export default {
     data() {
         return{
             dialog: false,
             newtask :{
               title: '',
               description: ''
             }
         }
     },
     methods: {
          addNewTask(){
           queries.postTask(this.newtask, callback=> {
             console.log(callback)
             this.$router.push({ name: "taskList"})
           })
         this.dialog = false
         }
     },
     created() {
       this.dialog = true
     }
 }
 </script>
 <style>
 </style>