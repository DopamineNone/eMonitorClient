import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useStatusStore = defineStore('status', () => {
    let wss = null
    const token = ref('')
    const isLoggedIn = computed(() => wss != null)
    const macAddress = ref('')
    const ipAddress = ref('')

    return {
        wss,
        token,
        isLoggedIn,
        macAddress,
        ipAddress
    }
})
