import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

// 客户端配置信息仓库
export const useConfigStore = defineStore('config', () => {
    // 服务端地址
    const serverIP = ref('localhost')
    const serverPort = ref(8080)

    const baseUrl = computed(() => {
        return `ws://${serverIP.value}:${serverPort.value}`
    })

    // 上传频率（毫秒每次）
    const uploadFrequency = ref(10000)

    return {
        baseUrl,
        uploadFrequency
    }
})
