<script setup>
import Auth from './pages/Auth.vue'
import Console from './pages/Console.vue'
import { useStatusStore } from './store/status'
import { onBeforeMount } from 'vue'
import { getScreenStream } from './utils/monitor'

const statusStore = useStatusStore()

onBeforeMount(() => {
    getScreenStream()
})

console.log(window.api.getMacAddress)
console.log(statusStore.isLoggedIn)
</script>

<template>
    <Auth v-if="!statusStore.isLoggedIn" />
    <Console v-else />
</template>
