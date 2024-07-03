<script setup>
import Versions from '../components/Versions.vue'
import AuthForm from '../components/AuthForm.vue'
// import { loginRequestHandler } from '../api/login'
// import { registerRequestHandler } from '../api/register'
</script>

<template>
    <img alt="logo" class="logo" src="../assets/electron.svg" />
    <div class="vue">eMonitor Client</div>
    <AuthForm @login="(a,b) => console.log(a,b)" @register="(a,b) => console.log(a,b)" />
    <Versions />
    <div class="creator">Powered by electron-vite</div>
</template>
