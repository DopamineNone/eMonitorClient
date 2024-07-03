import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

// 客户端配置信息仓库
export const useConfigStore = defineStore('config', () => {
    // 上传频率（毫秒每次）
    const uploadFrequency = ref(10000)

    return {
        uploadFrequency
    }
})
