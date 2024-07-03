<script setup>
import Auth from './pages/Auth.vue'
import Console from './pages/Console.vue'
import { useStatusStore } from './store/status'
import { onBeforeMount } from 'vue'

const statusStore = useStatusStore()
console.log(window.api.getMacAddress)
console.log(statusStore.isLoggedIn)
</script>

<template>
    <Auth v-if="!statusStore.isLoggedIn" />
    <Console v-else />
</template>
