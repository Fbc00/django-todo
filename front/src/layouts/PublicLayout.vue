<template>
    <v-main>
        <router-view />
        <page-footer />
    </v-main>
 
</template>

<script>
import PageFooter from '@/components/PageFooter.vue';
export default {
    components: { PageFooter }
}
</script>

<style>

</style>