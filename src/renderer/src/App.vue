<script setup>
import { ref, watchEffect } from 'vue'
import Auth from './pages/Auth.vue'
import Console from './pages/Console.vue'
import { useStatusStore } from './store/status'
import { onBeforeMount, onMounted } from 'vue'
import { getScreenStream } from './utils/monitor'

const statusStore = useStatusStore()

onBeforeMount(() => {
    // 获取状态信息
    window.setConnectStatus = (status) => {
        useStatusStore().isConnected = status
    }

    window.setLoginStatus = (status) => {
        useStatusStore().isLoggedIn = status
    }

    window.setWss = (status) => {
        useStatusStore().wss = status
    }

    window.setFrequency = (frequency) => {
        useStatusStore().uploadFrequency = frequency
    }
    getScreenStream()
})


// onMounted(() => {
//     dialogStore.showDialog('Welcome to eMonitor!', 'This is a test message.')
// })
// console.log('MAC:', window.api.MAC)
// console.log(statusStore.isLoggedIn)
</script>

<template>
    <Auth v-if="!statusStore.isLoggedIn" />
    <Console v-else />
</template>
