import { defineStore } from 'pinia'
import { ref } from 'vue'

// Define a store for client configuration
export const useConfigStore = defineStore('config', () => {
    // server url
    const baseUrl = 'ws://localhost:8080'

    // upload frequency in milliseconds
    const uploadFrequency = ref(10000)

    // set upload frequency
    function setUploadFrequency(frequency) {
        uploadFrequency.value = frequency
    }

    return {
        baseUrl,
        uploadFrequency,
        setUploadFrequency
    }
})
