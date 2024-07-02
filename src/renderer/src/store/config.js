import { defineStore } from 'pinia'
import { ref } from 'vue'

// 客户端配置信息仓库
export const useConfigStore = defineStore('config', () => {
    // 服务端地址
    const baseUrl = 'ws://localhost:8080'

    // 上传频率（毫秒每次）
    const uploadFrequency = ref(10000)

    // 设置上传频率
    function setUploadFrequency(frequency) {
        uploadFrequency.value = frequency
    }

    return {
        baseUrl,
        uploadFrequency,
        setUploadFrequency
    }
})
