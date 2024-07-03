<script setup>
import Auth from './pages/Auth.vue'
import Console from './pages/Console.vue'
import { useStatusStore } from './store/status'

const statusStore = useStatusStore()
console.log(statusStore.isLoggedIn)
</script>

<template>
    <Auth v-if="!statusStore.isLoggedIn" />
    <Console v-else />
</template>
