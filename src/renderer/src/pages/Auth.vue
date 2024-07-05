<script setup>
import Versions from '../components/Versions.vue'
import AuthForm from '../components/AuthForm.vue'

</script>

<template>
    <img alt="logo" class="logo" src="../assets/electron.svg" />
    <div class="vue">eMonitor Client</div>
    <AuthForm
        @login="loginRequestHandler"
        @register="registerRequestHandler"
        @connect="runWebSocket"
        @disconnect="closeWebSocket"
    />
    <Versions />
    <div class="creator">Powered by electron-vite</div>
    <!-- <button @click="useStatusStore().isLoggedIn = true">Close</button> -->
</template>
