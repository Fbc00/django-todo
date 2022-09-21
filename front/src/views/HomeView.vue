<template>
  <v-container class="container"> 
      <h1>Welcome Invocador</h1> 
      <h2> Todo-Route-List</h2>
    <v-img src="@/assets/logo.svg"
    max-width="400"
    min-width="400"
    max-height="400"
    ></v-img>
    <v-btn color="primary" x-large :to="{name: 'login'}"
    fab > <v-icon> fa-solid fa-forward </v-icon> </v-btn>
  </v-container>
</template>

<script>
export default {

}
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
  height: calc(100vh - 150px);
  gap: 1.2rem;
}
 h1, h2 {
  font-family: 'Roboto', sans-serif;
  font-weight: 400;
 }
</style>