<script setup>
import Versions from '../components/Versions.vue'
import AuthForm from '../components/AuthForm.vue'
import { loginRequestHandler } from '../api/login'
import { registerRequestHandler } from '../api/register'
import { runWebSocket, closeWebSocket } from '../utils/wss'
import { useStatusStore } from '../store/status'

const status = useStatusStore()
</script>

<template>
    <img alt="logo" class="logo" src="../assets/electron.svg" />
    <div class="vue">eMonitor Client</div>
    <AuthForm
        :is-connected="status.isConnected"
        @login="loginRequestHandler"
        @register="registerRequestHandler"
        @connect="runWebSocket"
        @disconnect="closeWebSocket"
    />
    <Versions />
    <div class="creator">Powered by electron-vite</div>
</template>
