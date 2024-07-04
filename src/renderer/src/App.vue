<script setup>
import Auth from './pages/Auth.vue'
import Console from './pages/Console.vue'
import Dialog from './components/Dialog.vue'
import { useStatusStore } from './store/status'
import { onBeforeMount } from 'vue'
import { getScreenStream } from './utils/monitor'

const statusStore = useStatusStore()

onBeforeMount(() => {
    getScreenStream()
})

statusStore.dialogVisible = true
statusStore.dialogTitle = 'Title'
statusStore.dialogMessage = 'This is a dialog message'

// console.log('MAC:', window.api.MAC)
// console.log(statusStore.isLoggedIn)

// window.onbeforeunload = (e) => {
//     e.preventDefault()
//     window.api.minimizeWindow()
// }
</script>

<template>
    <Auth v-if="!statusStore.isLoggedIn" />
    <Console v-else />
    <Dialog
        v-show="statusStore.dialogVisible"
        :title="statusStore.dialogTitle"
        :message="statusStore.dialogMessage"
        :buttons="statusStore.dialogButtons"
    />
</template>
