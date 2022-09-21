<template>

    <v-main>
        <v-row>
            <v-col md="6" offset-md="3">
                <v-card min-width="500px" class="pa-4">
                    <v-card-title>Registrar</v-card-title>
                    <v-text-field label ="Nome"
                    v-model="userRegister.name"
                    outlined>
                    </v-text-field>
                      <v-text-field label ="Email"
                      v-model="userRegister.email"
                    outlined>
                    </v-text-field>
                    <v-text-field
                    v-model="userRegister.username"
                    outlined
                    label="Usuário">
                    </v-text-field>
                    <v-text-field
                    v-model="userRegister.password"
                    outlined
                    label="Senha">
                    </v-text-field>
                    <v-text-field
                    v-model="userRegister.password_confirmation"
                    outlined
                    label="Confirme a senha">
                    </v-text-field>
                    <v-btn 
                    large 
                    block
                    color="orange">
                        Continuar
                    </v-btn>
                </v-card>
            </v-col>
        </v-row>
    </v-main>
  
</template>

<script>
export default {
    data(){
        return{
            userRegister:{
                name: '',
                email: '',
                username: '',
                password: '',
                password_confirmation: '',
            }
        }
    }
}
</script>

<style>

</style>